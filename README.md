# CS465
Archtitecture
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

Express HTML uses largely HTML input modified with handlebars for dynamically rendering the HTML. Meanwhile, the use of Angular for an SPA uses a combination of typescript, HTML, and javascript to provide a much more flexible and functional application. The use of Mongo assisted in navigating significant amounts of data all at once, as NoSQL databases excel in managing sizable parts of data. This is part of the reason that the MEAN stack includes Mongo as its database framework.

Functionality
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

JSON stands for javascript object notation, and is a part of the whole that makes Javascript. JSON is used to pass information between the front end and back end pieces by helping wtih database retrieval and communication between Express, Angular, and Node. This was used to refactor the static database created at the start of development into a functional MongoDB database collection, and allowed for more easily reusable code.
This reusability factor was prioritized in creating the innate HTML for components as well, drawing data from the associated javascript files to be able to do things like utilizing the same page for adding or editing trips, or establishing a dynamic header which would remain the same across pages without having duplicated code across the project.

Testing
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

Working with API testing largely occurred with the use of Postman for backend testing of endpoints, and testing for the front-end was largely completed manually. While there are automatic testing tools for full-stack applications like this, the provided tools made front-end testing more simple to complete through manual testing.
Methods, endpoints, and security all intertwine within the full-stack project. For instance, the authentication checks which were completed to determine if the user is logged in and therefore permitted to access parts of the site were conducted through component-based methods which drew upon the security established in the authentication sections of the project, which were then inherited into each of the endpoints which would require authentication. This also resulted in a significantly more complilcated implementation of accessing, adding, and updating trips, but provided an opportunity to practice in an environment much closer to real-world development.

Reflection
How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

Javascript, and by extension the myriad full-stack frameworks associated with javascript, are central to both modern web development as well as more traditional application development. In most positions, Javascript will at least provide some marketability due to the wide variety of applications associated with it. In the event that a job has no use for javascript, the knowledge and ability to complete a full-stack application and work in all parts of the stack will provide value to prospective employers.
