```js
function callcc (f,cc) {
  f(function(x,k) { cc(x) },cc)
}
```

## References

- <https://en.wikipedia.org/wiki/Call-with-current-continuation>
- <http://okmij.org/ftp/continuations/against-callcc.html>
