# Вклад в проект

Изначально Mineflayer создал [andrewrk](http://github.com/andrewrk), но с тех пор проект был улучшен и исправлен многими [помощниками](https://github.com/andrewrk/mineflayer/graphs/contributors).
Это то, почему важно знать, как внести свой вклад в mineflayer.

## Организация проблем

У нас есть метки трёх стадий для организаций проблем:

-   Стадия 1: созданы каким-либо новичком, мы не знаем, нуждается ли это в реализации или исправлении
-   Стадия 2: многообещающая идея, но требует дополнительного обдумывания перед реализацией
-   Стадия 3: идея точно задана, осталось только сделать код

Ссылки по типу https://github.com/PrismarineJS/mineflayer/issues?q=is%3Aopen+is%3Aissue+-label%3AStage1 могут использоваться для показа только с меток первой стадии, если вы хотите развить какую-либо тему.

## Создание тестов

Mineflayer имеет 2 вида тестов :

-   [Внутренние тесты](../../test/internalTest.js) : Тесты, которые выполняются на простом сервере, созданном с помощью node-minecraft-protocol.
-   [Внешние тесты](../../test/externalTests/) : Тесты, который выполняются на ванильном сервере.

Цель этих тестов - автоматически определить, что работает, а что нет в mineflayer, чтобы было проще заставить mineflayer работать.

### Создание внешних тестов

Для внешних тестов вам просто нужно создать файл в [test/externalTests](../../test/externalTests)

Например : [test/externalTests/digAndBuild.js](https://github.com/PrismarineJS/mineflayer/blob/master/test/externalTests/digAndBuild.js)

Этот файл должен экспортировать функцию, возвращающую функцию или массив функций, принимающих в качестве параметра объект бота и выполненный обратный вызов,  
он должен содержать утверждения для проверки, если тестируемая функциональность не сработала.

## Создание стороннего плагина

Mineflayer поддерживает плагины; любой желающий может создать плагин, который добавляет API еще более высокого уровня поверх Mineflayer.

Несколько сторонних плагинов, которые уже были сделаны вы можете найти [здесь](https://github.com/andrewrk/mineflayer#third-party-plugins).

Для того чтобы создать новый плагин, вам необходимо :

1. Создать новый репозиторий
2. В вашем файле index.js, экспортировать функцию init, которая будет принимать mineflayer в качестве аргумента. ([Пример](https://github.com/andrewrk/mineflayer-navigate/blob/e24cb6a868ce64ae43bea2d035832c15ed01d301/index.js#L18))
3. Эта функция возвращает функцию inject, которая принимает объект бота. ([Пример](https://github.com/andrewrk/mineflayer-navigate/blob/e24cb6a868ce64ae43bea2d035832c15ed01d301/index.js#L23))
4. С помощью этой inject функции можно добавить функционал объекту бота. ([Пример](https://github.com/andrewrk/mineflayer-navigate/blob/e24cb6a868ce64ae43bea2d035832c15ed01d301/index.js#L32))

Поскольку объект mineflayer передается в параметре, этот новый пакет не должен зависеть от mineflayer (в package.json не должно быть зависимости mineflayer)

Смотрите [полный пример здесь](https://github.com/andrewrk/mineflayer-navigate/tree/e24cb6a868ce64ae43bea2d035832c15ed01d301).

## Сообщения об ошибках

Mineflayer хорошо работает в большинстве случаев, но иногда в нем все еще есть ошибки.

При обнаружении ошибки лучше всего сообщить о проблеме, предоставив следующую информацию :

-   что вы хотите сделать (цель на английском языке)
-   что вы делаете (ваш код)
-   что происходит
-   что вы ожидали увидеть

## Код Mineflayer

Некоторые вещи, о которых следует подумать при отправке Pull Request или commit :

### Обработка ошибок

В большинстве случаев mineflayer не должен выводить бота из строя. Даже если что-то не сработает, бот может воспользоваться альтернативным маршрутом, чтобы добраться до своей цели.

Это означает, что мы не должны использовать `throw(new Error("error"))`, а вместо этого использовать соглашение node.js о передаче ошибки в обратном вызове.

-   Пример :

```js
function myfunction(param1, callback) {
    // что-то делаем
    let toDo = 1
    toDo = 2
    if (toDo === 2) {
        // всё работает
        callback()
    } else {
        callback(new Error("что-то не так"))
    }
}
```

Вы можете посмотреть другие примеры в [коде mineflayer](https://github.com/andrewrk/mineflayer/blob/a8736c4ea473cf1a609c5a29046c0cdad006d429/lib/plugins/bed.js#L10)

### Обновление документации

Список содержимого документации docs/api.md is made with doctoc. After updating that file, you should run doctoc docs/api.md to update the table of content.
