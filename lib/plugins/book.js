const assert = require("assert")
const { once } = require("../promise_utils")

module.exports = inject

function inject(bot) {
    const Item = require("prismarine-item")(bot.registry)

    let editBook
    if (bot.supportFeature("editBookIsPluginChannel")) {
        bot._client.registerChannel("MC|BEdit", "slot")
        bot._client.registerChannel("MC|BSign", "slot")
        editBook = (book, pages, title, slot, signing = false) => {
            if (signing) bot._client.writeChannel("MC|BSign", Item.toNotch(book))
            else bot._client.writeChannel("MC|BEdit", Item.toNotch(book))
        }
    } else if (bot.supportFeature("hasEditBookPacket")) {
        if (bot.supportFeature("editBookPacketUsesNbt")) {
            // 1.13 - 1.17
            editBook = (book, pages, title, slot, signing = false, hand = 0) => {
                bot._client.write("edit_book", {
                    hand: slot,
                    pages,
                    title,
                })
            }
        } else {
            // 1.18+
            editBook = (book, pages, title, slot, signing = false, hand = 0) => {
                bot._client.write("edit_book", {
                    new_book: Item.toNotch(book),
                    signing,
                    hand,
                })
            }
        }
    }

    async function write(slot, pages, author, title, signing) {
        assert.ok(slot >= 0 && slot <= 44, "slot out of inventory range")
        const book = bot.inventory.slots[slot]
        assert.ok(book && book.type === bot.registry.itemsByName.writable_book.id, `no book found in slot ${slot}`)
        const quickBarSlot = bot.quickBarSlot
        const moveToQuickBar = slot < 36

        if (moveToQuickBar) {
            await bot.moveSlotItem(slot, 36)
        }

        bot.setQuickBarSlot(moveToQuickBar ? 0 : slot - 36)

        const modifiedBook = await modifyBook(moveToQuickBar ? 36 : slot, pages, author, title, signing)
        editBook(modifiedBook, pages, title, moveToQuickBar ? 0 : slot - 36, signing)
        await once(bot.inventory, `updateSlot:${moveToQuickBar ? 36 : slot}`)

        bot.setQuickBarSlot(quickBarSlot)

        if (moveToQuickBar) {
            await bot.moveSlotItem(36, slot)
        }
    }

    function modifyBook(slot, pages, author, title, signing) {
        const book = Object.assign({}, bot.inventory.slots[slot])
        if (!book.nbt || book.nbt.type !== "compound") {
            book.nbt = {
                type: "compound",
                name: "",
                value: {},
            }
        }
        if (signing) {
            if (bot.supportFeature("clientUpdateBookIdWhenSign")) {
                book.type = bot.registry.itemsByName.written_book.id
            }
            book.nbt.value.author = {
                type: "string",
                value: author,
            }
            book.nbt.value.title = {
                type: "string",
                value: title,
            }
        }
        book.nbt.value.pages = {
            type: "list",
            value: {
                type: "string",
                value: pages,
            },
        }
        bot.inventory.updateSlot(slot, book)
        return book
    }

    bot.writeBook = async (slot, pages) => {
        await write(slot, pages, null, null, false)
    }

    bot.signBook = async (slot, pages, author, title) => {
        await write(slot, pages, author, title, true)
    }
}
