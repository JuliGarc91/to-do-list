# useState and useEffect

Let's break down this snippet of code from your `App.jsx` file line by line:

## Using useState with localStorage and JSON.parse

    ```js
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")
        if (localValue == null) return []
        return JSON.parse(localValue)
    });
    ```
1. `const [todos, setTodos] = useState(() => { ... });`
   - This line declares a state variable `todos` in your React component using the `useState` hook.
   - `useState` is a Hook that lets you add React state to function components.
   - `todos` is the current state, and `setTodos` is a function that allows you to update this state.
   - `useState` takes an initial state as its argument. In this case, the initial state is determined by a function (which is defined in the subsequent lines).

2. `const localValue = localStorage.getItem("ITEMS")`
   - This line retrieves a value from the browser's local storage.
   - `localStorage` is a web API that allows you to store data locally within the user's browser. This data persists even when the browser is closed and reopened.
   - `getItem("ITEMS")` is a method to get the data associated with the key `"ITEMS"`. If there is no data for this key, `null` is returned.

3. `if (localValue == null) return []`
   - This line checks if `localValue` is `null`.
   - If `localValue` is `null`, it means there's no data in local storage for the key `"ITEMS"`. In this case, the function returns an empty array `[]`.
   - Returning an empty array here is a way to provide a default state when there's no data in local storage. It ensures that `todos` will be an array, maintaining consistency in your component's state.

4. `return JSON.parse(localValue)`
   - If `localValue` is not `null`, this line will execute.
   - `JSON.parse(localValue)` converts the JSON string retrieved from local storage back into a JavaScript object or array.
   - Local storage can only store strings, so your todo data, likely an array of objects, was converted into a JSON string before being stored. This line reverses that process, converting the JSON string back into its original format (array of todos).
   - The returned value from `JSON.parse` is then used as the initial value for `todos`.

**Relevance in `App.jsx`:**

- This code is crucial for implementing persistence in your todo application.
- It allows the app to remember the user's todos even after the browser is closed or refreshed.
- By using local storage, the todos are stored locally on the user's device, providing a simple yet effective way to retain data across sessions.
- The use of `useState` with a function as an initializer ensures that the potentially expensive operation of accessing local storage and parsing JSON is only done on the initial render of the component, optimizing performance.

## Using useState with useEffect, localStorage, and JSON.stringify

This code snippet uses the `useEffect` hook in your React component, specifically within your `App.jsx` file. Let's break it down line by line:

    ```js
        useEffect(() => {
            localStorage.setItem("ITEMS", JSON.stringify(todos))
        }, [todos]);
    ```

1. `useEffect(() => { ... }, [todos]);`
   - `useEffect` is a React hook that lets you perform side effects in function components. Side effects are operations that can reach outside the functional scope of a component, like data fetching, subscriptions, or manually changing the DOM.
   - The first argument of `useEffect` is a function that contains the code you want to run.
   - The second argument is a dependency array. The effect will only re-run if one of the dependencies has changed. In this case, the dependency is `todos`.

2. `localStorage.setItem("ITEMS", JSON.stringify(todos))`
   - This line of code is executed whenever the effect runs.
   - `localStorage.setItem("ITEMS", ...)` is a method to store data in the browser's local storage. `"ITEMS"` is the key, and the second argument is the value to be stored.
   - `JSON.stringify(todos)` converts your `todos` state, which is likely an array of objects, into a JSON string. Local storage can only store strings, so this conversion is necessary.
   - By storing the `todos` state in local storage, you are effectively persisting the todos data so it can be retrieved and used when the app is reloaded or reopened.

3. `, [todos]);`
   - This part of `useEffect` specifies that this effect depends on the `todos` state.
   - This means the effect will run whenever the `todos` state changes - for example, when a new todo is added, an existing one is toggled or deleted.
   - The effect won't run if the `todos` state stays the same between renders, which helps in optimizing performance by preventing unnecessary operations.

**Relevance in `App.jsx`:**

- This code is essential for ensuring that any changes to the `todos` state are saved to local storage. This is how the application remembers the state of the todos across different sessions.
- Without this `useEffect`, if you add, modify, or delete a todo and then refresh or close the browser, your changes would be lost. With this code, the changes are persisted in the local storage of the browser.
- This pattern of using `useState` for state management and `useEffect` for side effects like local storage synchronization is a common and effective way to handle persistent state in modern React applications.


# TroubleShooting errors

It seems like you've implemented local storage to persist your todo list in a React application, and now you're facing some issues. Let's break down what you've done and see how we can fix any potential problems.

1. **Initial State from Local Storage**: You've updated the initial state of `todos` to load from local storage. This is a good approach to persist data across sessions.

   ```javascript
   const [todos, setTodos] = useState(() => {
     const localValue = localStorage.getItem("ITEMS")
     if (localValue == null) return []
     return JSON.parse(localValue)
   });
   ```

2. **UseEffect for Updating Local Storage**: You're using `useEffect` to update the local storage whenever `todos` changes. This is also correct.

   ```javascript
   useEffect(() => {
     localStorage.setItem("ITEMS", JSON.stringify(todos))
   }, [todos]);
   ```

3. **Potential Issues**: 
   - If the application is not behaving as expected after these changes, it could be due to the way the local storage is read or written. Ensure that the key used (`"ITEMS"`) is consistent and unique.
   - There might be an issue with the data structure stored in local storage not matching the expected structure in your application.

4. **Debugging Tips**:
   - Check the console for any errors or warnings.
   - Log the value of `todos` after setting it from local storage to see if it's being set correctly.
   - Verify the data in local storage is in the correct format (use browser dev tools).

5. **Improvements**:
   - Consider using a try-catch block around `JSON.parse` to handle any potential errors with corrupted or invalid JSON data in local storage.
   - It's good practice to abstract local storage logic into a custom hook or a utility function for better maintainability.

6. **Rest of the Code**: The rest of your code, including the `addToDo`, `toggleTodo`, and `deleteTodo` functions, seems to be handling the state correctly. Ensure these functions are updating the state as expected.

If you're still facing issues, it might be helpful to know the specific problem you're encountering (e.g., error messages, unexpected behavior, etc.). This would allow for a more targeted solution.

The error message you're encountering indicates an issue with the `JSON.parse` method in your code. This specific error, `Unexpected token 'u'`, usually occurs when `JSON.parse` tries to parse `undefined` or `null` values. In your code, this likely happens when the `localStorage.getItem("ITEMS")` call returns `null` or an undefined value, which is not valid JSON.

## Error message and solution:

```
Uncaught SyntaxError: Unexpected token 'u', "function st"... is not valid JSON
    at JSON.parse (<anonymous>)
    at App.jsx:11:17
    at mountState (react-dom_client.js?v=e0d458d0:12626:28)
    at Object.useState (react-dom_client.js?v=e0d458d0:13166:24)
    at useState (chunk-4YP5LC2O.js?v=e0d458d0:1067:29)
    at App (App.jsx:8:29)
    at renderWithHooks (react-dom_client.js?v=e0d458d0:12169:26)
    at mountIndeterminateComponent (react-dom_client.js?v=e0d458d0:14919:21)
    at beginWork (react-dom_client.js?v=e0d458d0:15900:22)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=e0d458d0:3672:22)
```

Here's a revised version of your initial state setup to handle this case:

```javascript
const [todos, setTodos] = useState(() => {
  const localValue = localStorage.getItem("ITEMS")
  if (localValue == null) return []
  try {
    return JSON.parse(localValue)
  } catch (e) {
    console.error("Parsing error in localStorage 'ITEMS':", e);
    return [];
  }
});
```

In this revised code:

 The `try-catch` block around `JSON.parse` will handle any parsing errors. If there's an error in parsing (which could be due to corrupted or improperly formatted data in local storage), it will log the error and return an empty array. This approach ensures that your application doesn't crash due to an unexpected value in local storage and handles potential data corruption gracefully.

1. `const [todos, setTodos] = useState(() => { ... });`
   - This line declares a state variable `todos` in your React component, using the `useState` hook.
   - `useState` is a built-in React hook that lets you add state to function components.
   - `todos` is the state variable that will store your list of todo items.
   - `setTodos` is the function you will use to update the `todos` state.
   - The argument to `useState` here is a function. This means that the initial state for `todos` is determined by this function.

2. `const localValue = localStorage.getItem("ITEMS")`
   - This line retrieves a value from the browser's local storage under the key `"ITEMS"`.
   - `localStorage` is a web API for storing data locally in the user's browser. It allows you to save key/value pairs, and the data persists even after the browser window is closed.
   - `getItem("ITEMS")` fetches the data associated with the key `"ITEMS"`. If there is no data for this key, `null` is returned.

3. `if (localValue == null) return []`
   - This line checks if `localValue` is `null`.
   - If `localValue` is `null`, it implies that there is no stored data in local storage for the key `"ITEMS"`. In this case, the function returns an empty array `[]`.
   - This is a way to set a default state (an empty array of todos) when there's no data available in local storage.

4. `try { ... } catch (e) { ... }`
   - This block of code is a try-catch statement, which is used for error handling.
   - It's particularly useful when you have code that might throw an exception, which you want to handle gracefully.

5. `return JSON.parse(localValue)`
   - Inside the try block, this line attempts to parse the `localValue` string as JSON.
   - `JSON.parse(localValue)` converts the JSON string stored in local storage back into a JavaScript object or array (in your case, likely an array of todo items).
   - Local storage can only store strings, so the todos are stored as a stringified JSON. This line reverts them back to their original format.

6. `console.error("Parsing error in localStorage 'ITEMS':", e);`
   - If an error occurs during the JSON parsing, the catch block will execute.
   - This line logs the parsing error to the console. It's useful for debugging purposes, letting you know if there's an issue with the data in local storage.

7. `return [];`
   - Still inside the catch block, this line returns an empty array.
   - If an error occurs (like if the stored JSON is corrupted), this ensures that your component's state is still set to a valid value (an empty array), allowing your app to function without crashing.

**Overall Relevance:**

- This code is central to initializing the `todos` state in your application with data from local storage.
- It provides a robust way to handle potentially corrupted or invalid data in local storage.
- Using a function to initialize state is efficient, especially when the initial state is based on a potentially expensive operation (like reading from local storage and parsing JSON).
- The pattern ensures that your todo application can maintain its state across browser sessions, improving the user experience.