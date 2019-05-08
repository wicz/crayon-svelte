# Crayon
## SPA, regardless of your framework

_Use inside the browser with React, Vue, Svelte3, CustomElements, or Angular (Ivy)_

### Example

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import * as crayon from 'crayonjs'

const app = crayon.create()

app.use(crayon.ReactRouter('#app', React, ReactDOM))

app.path('/', (req, res) => res.mount(() => <div>Hello World</div>))

app.load()
```

### Installation

```bash
# For npm users
npm install --save crayonjs

# For yarn users
yarn add crayonjs
```

### Framework

You can select your framework by using a middleware

```javascript
// React
app.use(crayon.ReactRouter('#app', React, ReactDOM))

// Vue 
app.use(crayon.VueRouter('#app', Vue))
app.use(crayon.VueAnimate({ name: 'fade' }))

// Svelte 3 - TODO
app.use(crayon.SvelteRouter('#app'))

// Native custom elements - TODO
app.use(crayon.ElementsRouter('#app'))

// Angular - TODO with Ivy
app.use(crayon.AngularRouter('#app'))
```

### Multiple Frameworks

Apply inline middleware on the specific route to describe how it should render

```javascript
app.path('/react-page', crayon.ReactRouter('#app', React, ReactDOM), (req, res) => 
    res.mount(ReactComponent)
)

app.path('/vue-page', crayon.Vue('#app', Vue), (req, res) => 
    res.mount(VueComponent)
)
```

### Lazy Loading

Lazy loading simply requires you to use the latest JavaScript dynamic module feature `import()`

```javascript
app.path('/', async (req, res) => {
    const HomeView = await import('./home-view')
    res.mount(HomeView)
})
```

### Route Groups

Groups (at least at this stage) are simply functions that take a `router` instance and register their routes.

```javascript
import { UsersView, UsersDetailView } from './views'

const usersGroup = (app) => {
    app.path('/users', (req, res) =>
        res.mount(UsersView)
    )

    app.path('/users/:id', (req, res) =>
        res.mount(UsersDetailView)
    )
}
```

```javascript
import * as crayon from 'crayon';
import { usersGroup } from './users'

const app = crayon.create()

app.use(crayon.ReactRouter('#app', React, ReactDOM))
usersGroup(app)

app.path('/', (req, res) =>
    res.mount(views.HomeView)
)

app.load()
```

### Dealing With Dependencies

Because this is a simple top-down model, it's easy to pass your dependencies directly into your UI library using function closures.

```jsx
export const MyView = (dep) => () => <div>{ dep.value }<div>
```

```javascript
import * as crayon from 'crayon';
import { MyView } from './views'

const dep = { value: 'hello world' }
const app = crayon.create()

app.use(crayon.ReactRouter('#app', React, ReactDOM))

app.path('/', (req, res) => res.mount(MyView(dep)))

app.load()
```