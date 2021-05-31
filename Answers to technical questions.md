Q1: I spent roughly 9 hours on this coding assignment. If I had more time, I would improve how the application handles sorting, so that when the API response is received, it would store two copies of the results: one sorted by title, and one sorted by publishing date. Then the user could switch between sort orders quicker. I would also look to shorten the time taken to load search results. Finally, I would add more animations: transitions between states (start page, loading page, results page) and visual feedback when mousing over elements of the page.

Q2: The latest JavaScript specification is ECMAScript 2020. This version introduced the nullish coalescing (`??`) and optional chaining (`?.`) operators. These features improve the readability of code when dealing with nullish (`null` or `undefined`) values. The `??` operator allows you to set a default value for an expression, while recognizing falsy values (like `0` or the empty string) as acceptable values. The `?.` operator allows you to try an access properties of an object that could be undefined, without raising a TypeError. As an example, suppose we have a (potentially undefined) variable `movie` that contains information about a particular movie. This object has a `num_awards` property that represents the number of awards that movie received. However, this information is crowd-sourced, so the `num_awards` property could be undefined. We want an expression that represents this property if it is defined, or by default is equal to `"Unknown"`. Also consider that `0` is a valid value for the `num_awards` property. Without the new operators, this expression would be:
```
movie ? (movie.num_awards !== undefined ? movie.num_awards : undefined) : "Unknown"
```
This expression is opaque and doesn't immediately convey what it represents. With the new operators, we instead have this expression:
```
movie?.num_awards ?? "Unknown"
```
This expression is much more readable. We can clearly see what the expression normally represents, and what the fallback value is. It isn't uncommon for variables to be updated asynchronously and for objects to have optional properties, so situations like this can occur often.

Q3: Assuming that this issue comes with steps to reproduce it, I would reproduce the issue while using a profiler (like the one that is included in Chromium). Using this tool, I can find where the performance drop occurs, and what function calls were made at that time. I can also see how long function calls are taking, and see which ones take an usually long amount of CPU time. If
I have an idea of what function is causing the performance issue, I would use log statements to log the steps of that procedure, and then use the timestamps in the log to see which step is taking too long. While I have had to deal with performance issues, I can't recall a time where the cause of the issue wasn't immediately obvious. One such case was in an app I was developing last year, where a particular screen transition was lagging. I knew that the information rendered on the next screen came from a particularly large computation, so that was the first place that I checked. Moving this computation to a background thread solved the performance issue.

Q4: To improve this API, I would improve the URL parameters. I would add a 'count' parameter to specify how many search results are returned in a single response. This would prevent applications from breaking if API changes were made. I would also generalize the 'sort' parameter so that the client could sort by any property in both directions. Finally, I would look into improving the response time of the API, since the endpoints seem to take a couple seconds to return a response.

Q5:
```json
{
    "name":{
        "first":"David",
        "middle":[
            "Thevaraj"
        ],
        "last":"Canagasabey"
    },
    "gender":"Male",
    "age":22,
    "employed":false,
    "skills":{
        "spoken_languages":[
            "ENGLISH",
            "FRENCH"
        ],
        "programming_languages":[
            "JAVASCRIPT",
            "PYTHON",
            "JAVA",
            "C"
        ],
        "soft_skills":[
            "Work Ethic",
            "Critical Thinking",
            "Communication",
            "Leadership"
        ]
    }
}
```