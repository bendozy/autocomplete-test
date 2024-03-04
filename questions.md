# Part 2 Question and Answers

### What is the difference between Component and PureComponent? Give an example where it might break my app.

- `Component` does not implement `shouldComponentUpdate()`, so the component re-renders by default whenever it receives new props or state. `PureComponent`, on the other hand, implements `shouldComponentUpdate()` with a shallow prop and state comparison. This means that it only re-renders if the props or state actually change. This can lead to performance improvements, as unnecessary re-renders are avoided.
- `PureComponent` can potentially break your app if you're not careful with how you handle your component's state or props. Since `PureComponent` does a shallow comparison, it will not detect changes in nested objects or arrays which can lead to missed re-renders.

### Context + ShouldComponentUpdate might be dangerous. Why is that?

- The combination of Context and `shouldComponentUpdate` can be problematic because `shouldComponentUpdate` does not check for changes in context. This means that if a component's context changes, but its props and state do not, `shouldComponentUpdate` will return false and the component will not re-render, even though it should. This can lead to bugs where a component does not update in response to context changes. This is especially problematic if the component relies on the context for its rendering logic.

### Describe 3 ways to pass information from a component to its PARENT.

- **Callback Functions:** This is the most common way to pass information from a child component to its parent. The parent passes a function to the child as a prop, and the child calls this function and passes it the information that needs to be sent to the parent
- **Using Redux or other state management libraries:** These libraries allow you to store state in a global store that can be accessed from any component in the app. This is a more advanced and complex solution, but it can be useful for large apps with complex state management needs.
- **Using Context**: If the parent-child relationship is deeply nested, passing props down multiple levels can get messy. In this case, you can use React's Context API to share values between components without having to explicitly pass a prop through every level of the tree.

### Give 2 ways to prevent components from re-rendering.

- Using `React.PureComponent`: `PureComponent` is a type of component that implements `shouldComponentUpdate` with a shallow prop and state comparison. This means it only re-renders if the props or state actually change.
- Using `React.memo`: `React.memo` is a higher order component that does a shallow comparison of props and prevents re-render if the props haven't changed. It's similar to PureComponent, but for functional components.

## What is a fragment and why do we need it? Give an example where it might break my app.

- A Fragment in React is a common pattern for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM. Fragments are useful when a component needs to return multiple elements, but you don't want to wrap them in a div or other container element. This can be important for maintaining CSS layout and semantics, as well as keeping the DOM tree clean and efficient.

- There are a few cases where using a Fragment can break your app:

  - **Keyed Fragments and Arrays**: If you're mapping an array to a list of Fragments, you need to provide a key to each Fragment, just like you would with any other element in a list. If you forget to provide a key, you'll get a warning and your app may not behave as expected.

  ```
    // This will cause a warning and potential issues
    items.map(item => (
        <React.Fragment>
            <div>{item.name}</div>
            <div>{item.description}</div>
        </React.Fragment>
    ))

    // This is the correct way to do it
    items.map(item => (
        <React.Fragment key={item.id}>
            <div>{item.name}</div>
            <div>{item.description}</div>
        </React.Fragment>
    ))
  ```

  - **Attributes**: Fragments do not support attributes or event handlers. If you try to add an attribute or event handler to a Fragment, it will be ignored and you'll get a warning.

  ```
    // This will cause a warning and the onClick will be ignored
    <React.Fragment onClick={this.handleClick}>
        <ChildA />
        <ChildB />
        <ChildC />
    </React.Fragment>
  ```

### Give 3 examples of the HOC pattern.

- Higher-Order Components (HOCs) are a pattern in React where a function takes a component and returns a new component with additional props or behavior. Here are three patterns:

  - **With Loading Indicator HOC:** This HOC shows a loading indicator while data is being fetched.

    ```
    function withLoadingIndicator(Component) {
        return function EnhancedComponent({ isLoading, ...props }) {
            if (isLoading) {
                return <div>Loading...</div>;
            }

            return <Component {...props} />;
        };
    }
    ```

  - **With Error Handling HOC**: This HOC shows an error message if there was an error during data fetching.
    ```
    function withErrorHandler(Component) {
        return function EnhancedComponent({ error, ...props }) {
            if (error) {
                return <div>Error: {error.message}</div>;
            }
            return <Component {...props} />;
        };
    }
    ```
  - **With Authorization HOC**: This HOC redirects to a login page if the user is not authenticated.

    ```
    import { Redirect } from 'react-router-dom';

    function withAuthorization(Component) {
        return function EnhancedComponent({ isAuthenticated, ...props }) {
            if (!isAuthenticated) {
                return <Redirect to="/login" />;
            }
            return <Component {...props} />;
        };
    }
    ```

### What's the difference in handling exceptions in promises, callbacks and async...await?

- Handling exceptions in Promises, Callbacks, and Async/Await differs primarily in the syntax and structure of the error handling mechanism.

  - **Callbacks**: In callback-based functions, error handling is typically done through a convention where the first argument of the callback is an error object. If there is an error, the error object will be populated, and if not, it will be null.

    ```javascript
    fs.readFile('file.txt', function (err, data) {
      if (err) {
        // Handle error
        console.error('Error reading file:', err);
        return;
      }
      // Continue processing data
      console.log(data);
    });
    ```

  - **Promises**: Promises use the `.catch()` method for error handling. Any errors that occur in the promise chain will be passed to the next `.catch()` handler.

    ```javascript
    fetch('/api/data')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        // Handle any error that occurred in any of the previous promises
        console.error('Error fetching data:', err);
      });
    ```

  - **Async/Await**: Async/Await makes it possible to use the traditional `try/catch` structure for error handling in asynchronous code, which can make the code cleaner and easier to understand.

    ```javascript
    async function fetchData() {
      try {
        let response = await fetch('/api/data');
        let data = await response.json();
        console.log(data);
      } catch (err) {
        // Handle any error that occurred in the above statements
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
    ```

### How many arguments does setState take and why is it async.

- The setState function in React can take up to two arguments:

  - **State Update**: This can be an object that will be merged into the current state, or a function that receives the current state and props and returns a new state object.
  - **Callback**: This is an optional function that will be executed after setState is completed and the component is re-rendered. It's often used to ensure that certain actions are executed after the state has been updated.

  - `setState` is asynchronous for performance reasons. React may batch multiple setState calls into a single update for performance. Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the new state. Instead, use the function form of setState that receives the previous state and props

### List the steps needed to migrate a Class to Function Component.

- **Convert the Class Component to a Function**: Start by changing the class component to a function. The function should take one argument, `props`

- **Replace `this.props` with `props`**: In class components, props are accessed via `this.props`. In function components, props are accessed directly.

- **Replace State with `useState` Hook**: If your class component uses state, you'll need to replace `this.state` and `this.setState` with the `useState` hook.

- **Replace Lifecycle Methods with `useEffect` Hook**: If your class component uses lifecycle methods like `componentDidMount`, `componentDidUpdate`, or `componentWillUnmount`, you'll need to replace them with the `useEffect` hook.

- **Replace Instance Methods**: If your class component uses instance methods, you'll need to replace them with functions inside your function component. If these functions need to persist across renders, you can use the `useCallback` hook.

- **Replace `this` Keyword**: In class components, the `this` keyword is used to access props, state, and methods. In function components, there is no `this`, so you'll need to adjust your code accordingly.

### List a few ways styles can be used with components.

There are several ways to apply styles to components in React:

- **Inline Styles**: You can use the `style` attribute to apply inline styles to a component. The style value must be an object where the keys are camelCased versions of the CSS property names.

- **CSS Classes**: You can use the `className` attribute to apply CSS classes to a component. The CSS classes must be defined in an external CSS file.

- **Styled Components**: Styled Components is a library that allows you to write actual CSS code in your JavaScript. This can be a powerful way to style your components, especially for complex styles or styles that depend on props.

- **CSS Modules**: CSS Modules are a way to write CSS that's scoped to a single component. This can help prevent CSS conflicts and make your styles easier to manage.

- **CSS-in-JS Libraries**: There are many libraries like Emotion or JSS that allow you to write CSS styles in JavaScript. They provide more dynamic and powerful styling options.

## How to render an HTML string coming from the server.

- Rendering an HTML string from the server in a React component can be done using the `dangerouslySetInnerHTML` prop. This prop is named as such to remind you that it should be used with caution, as it can lead to cross-site scripting (XSS) attacks if the HTML string contains malicious code.
