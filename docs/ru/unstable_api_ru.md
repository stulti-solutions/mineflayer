<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Содержание** _сгенерировано с помощью [DocToc](https://github.com/thlorenz/doctoc)_

-   [unstable API : bot.\_](#unstable-api--bot_)
    -   [bot.\_client](#bot_client)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# unstable API : bot.\_

Эти методы и классы могут быть полезны в особых случаях, но являются нестабильными и могут изменятся в любой момент.

## bot.\_client

`bot._client` создан при помощи [node-minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol).
Он обрабатывает запись и чтение пакетов.
Работа данного метода постоянно меняется, так как версии Minecraft постоянно обновляются.
Рекомендуем использовать стандартные методы Mineflayer, если это возможно
