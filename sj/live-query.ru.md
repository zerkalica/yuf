# Live query

## Фичи

* Имитация GET/POST/DELETE поверх сокета: запрос-ответ, получение, сохранение, удаление
* Подписка/отписка на изменения данных
* Передача ошибок, связанных с запросом или подпиской
* Типизация: возможность описать union объектов событий в ts/asyncapi
* Использование одних и тех же типов для получения и обновления сущности
* Прозрачное, простое в реализации на сервере (де)мультиплексирование запросов на другое устройство и ответов/событий от него
* Отсутствие специального апи для подписок/отписок с генераций request-id
* Сервер может не реализовывать подписки, а всегда слать в сокет любые изменения
* Сервер может не реализовывать апдейты, а просто отправить обратно пришедший запрос, уведомляя клиент, что запрос обработан
* Совместимость с часто используемым в ws форматом сообщений, объект с type

```ts
	type Value = string | number | boolean | null

	export type Message = {
		// entity or list type
		type: string

		// entity id
		id?: string | number

		// list search params
		query?: Record<string, Value | readonly Value[]> | null

		// optional target server ids paths
		device?: readonly string[]

		// to server: undefined - get and subscribe, null - delete, object - replace
		// from server: null - deleted, object - new data
		data?: unknown

		// Error enum
		error?: number | string | null

		// Optional error message
		message?: string | null
	}
```

## Примеры по аналогии с GET / POST

request - to server, response - from server

### Update firmware

POST `/device/123/firmware` body `{ firmware: 'base64data' }`

WS request: `{ device: [ '123' ], type: 'firmware', data: { firmware: 'base64data' }}`

WS response: `{ device: [ '123' ], type: 'firmware' }`


### Get status

GET `/device/123/info` response `{ status: 'OK', version: '1.0.0' }`

WS request + subscribe to device 123 info changes: `{ device: [ '123' ], type: 'info' }`

WS response + updates: `{ device: [ '123' ], type: 'info', data: { status: 'OK', version: '1.0.0' }`

WS response error: `{ device: [ '123' ], type: 'info', error: 'SOME_ERROR', message: 'optional error text' }`

WS unsubscribe request: `{ device: [ '123' ], type: 'info', error: null }`


### Get rules id list

GET `/device/123/rules?allow=1` response `['1', '2', '3']`

WS request + subscribe: `{ device: [ '123' ], type: 'rules', query: { allow: 1 }`

WS response + updates: `{ device: [ '123' ], type: 'rules', query: { allow: 1 } , data: ['1', '2', '3'] }`


### Delete rules by filter params

DELETE  `/device/123/rules?allow=1` response `{}`

WS request: `{ device: [ '123' ], type: 'rules', query: { allow: 1 }, data: null }`

WS response: `{ device: [ '123' ], type: 'rules', query: { allow: 1 }, data: null }`


### Delete rule by id

DELETE `/device/123/rule/32112` response `{}`

WS request: `{ device: [ '123' ], type: 'rule', id: '32112', data: null }`

WS response: `{ device: [ '123' ], type: 'rule', id: '32112', data: null }`


### Get task from device by id

GET `/device/123/task/32112` response `{ status: 'OK', progress: 100 }`

WS request + subscribe: `{ device: [ '123' ], type: 'task', id: '32112' }`

WS response + updates: `{ device: [ '123' ], type: 'task', id: '32112', data: { status: 'OK', progress: 100 } }`


### Get task by id from subdevice

GET `/device/123/subdev/321/task/32112` response `{ status: 'OK', progress: 100 }`

WS request + subscribe: `{ device: [ '123', '321' ], type: 'task', id: '32112' }`

WS response + updates: `{ device: [ '123', '321' ], type: 'task', id: '32112', data: { status: 'OK', progress: 100 } }`

