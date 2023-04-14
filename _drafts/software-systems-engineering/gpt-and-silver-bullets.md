AI-assisted coding isn't a solution to Software Engineering any more than
autocomplete is.

These tools move the programming from Type 2 thinking to Type 1 by automating
the effort. They do NOT eliminate the underlying complexity in the first place.

Analogy:

GIMP does not have the ability to draw a circle directly. So you have to use
a variety of tricks to get one:

<https://thegimptutorials.com/how-to-draw-circle/>

Imagine thinking that the solution to this is adding a feature that automates
performing one or more of these approaches instead of defining a proper, declarative
abstraction for it like you see in competitor tools.

A more direct comparison: the Java Language and IDEs. The IDE will generate
getters and setters for fields so you don't have to mindlessly do it yourself:

```java
public class Employee {
 private int id;
 private String name;
 private int age;
 private String title;
}
```

`Context Menu > Source > Generate Getters and Setters...`

Which generates:

```java
public class Employee {
 private int id;
 private String name;
 private int age;
 private String title;
 
 public int getId() {
  return id;
 }
 public void setId(int id) {
  this.id = id;
 }
 public String getName() {
  return this.name;
 }
 public void setName(String name) {
  this.name = name;
 }
 public int getAge() {
  return this.age;
 }
 public void setAge(int age) {
  this.age = age;
 }
 public String getTitle() {
  return this.title;
 }
 public void setTitle(String title) {
  this.title = title;
 }
}
```

Instead of creating tools to automate the drudgery, eliminating it by improving the
language is the better path.

In TypeScript for example the above equivalent would be:

```ts
class Person {
 accessor id: number
 accessor name: string
 accessor age: number
 accessor title: string
}
```

<https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html>

// Write a program that sorts an array of integers
// vs
// myArray.sort()
// Chat GPT and copilot are moreso replacing the need for search engines than for
// programmers (unless the latter were just doing commodity drudge-work anyway)

// reference requirements issues like Bertrand Meyer's blog post and that comic
