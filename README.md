## Unit Assignment: Flixster

Submitted by: Hector Zambrano Serrano

Estimated time spent: 30 hours spent in total

Deployed Application (**required**): [Flixster Deployed Site](https://flixster-starter-yn3z.onrender.com)

### Application Features

#### REQUIRED FEATURES

- [X] **Display Movies**
  - [X] Users can view a list of current movies from The Movie Database API in a grid view.
    - [X] Movie tiles should be reasonably sized (at least 6 playlists on your laptop when full screen; large enough that the playlist components detailed in the next feature are legible).
  - [X] For each movie displayed, users can see the movie's:
    - [X] Title
    - [X] Poster image
    - [X] Vote average
  - [X] Users can load more current movies by clicking a button which adds more movies to the grid without reloading the entire page. 
- [X] **Search Functionality**
  - [X] Users can use a search bar to search for movies by title.
  - [X] The search bar should include:
    - [X] Text input field
    - [X] Submit/Search button
    - [X] Clear button
  - [X] Movies with a title containing the search query in the text input field are displayed in a grid view when the user either:
    - [X] Presses the Enter key
    - [X] Clicks the Submit/Search button
  - [X] Users can click the Clear button. When clicked:
    - [X] Most recent search results are cleared from the text input field and the grid view and all current movies are displayed in a grid view
- [X] **Design Features**
  - [X] Website implements all of the following accessibility features:
    - [X] Semantic HTML
    - [X] [Color contrast](https://webaim.org/resources/contrastchecker/)
    - [X] Alt text for images 
  - [X] Website implements responsive web design.
    - [X] Uses CSS Flexbox or CSS Grid
    - [X] Movie tiles and images shrink/grow in response to window size
  - [X] Users can click on a movie tile to view more details about a movie in a pop-up modal.
    - [X] The pop-up window is centered in the screen and does not occupy the entire screen.
    - [X] The pop-up window has a shadow to show that it is a pop-up and appears floating on the screen.
    - [X] The backdrop of the pop-up appears darker or in a different shade than before. including:
    - [X] The pop-up displays additional details about the moving including:
      - [X] Runtime in minutes
      - [X] Backdrop poster
      - [X] Release date
      - [X] Genres
      - [X] An overview
  - [X] Users can use a drop-down menu to sort movies.
    - [X] Drop-down allows movies to be sorted by:
      - [X] Title (alphabetic, A-Z)
      - [X] Release date (chronologically, most recent to oldest)
      - [X] Vote average (descending, highest to lowest)
    - [X] When a sort option is clicked, movies display in a grid according to selected criterion.
  - [X] Website displays:
    - [X] Header section
    - [X] Banner section
    - [X] Search bar
    - [X] Movie grid
    - [X] Footer section
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the [color contrast checker](https://webaim.org/resources/contrastchecker/) to demonstrate to the grading team that text and background colors on your website have appropriate contrast. The Contrast Ratio should be above 4.5:1 and should have a green box surrounding it. 
  - [X] **Deployment**
  - [X] Website is deployed via Render.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: For ease of grading, please use the deployed version of your website when creating your walkthrough. 

#### STRETCH FEATURES


- [X] **Embedded Movie Trailers**
  - [X] Within the pop-up modal displaying a movie's details, the movie trailer is viewable.
    - [X] When the trailer is clicked, users can play the movie trailer.
- [X] **Favorite Button**
  - [X] For each movie displayed, users can favorite the movie.
  - [X] There should be visual element (such as a heart icon) on each movie's tile to show whether or not the movie has been favorited.
  - [X] If the movie is not favorited:
    - [X] Clicking on the visual element should mark the movie as favorited
    - [X] There should be visual feedback (such as the heart turning a different color) to show that the movie has been favorited by the user.
  - [X] If the movie is already favorited:
    - [X] Clicking on the visual element should mark the movie as *not* favorited.
    - [X] There should be visual feedback (such as the heart turning a different color) to show that the movie has been unfavorited. 
- [X] **Watched Checkbox**
  - [X] For each movie displayed, users can mark the movie as watched.
  - [X] There should be visual element (such as an eye icon) on each movie's tile to show whether or not the movie has been watched.
  - [X] If the movie has not been watched:
    - [X] Clicking on the visual element should mark the movie as watched
    - [X] There should be visual feedback (such as the eye turning a different color) to show that the movie has been watched by the user.
  - [X] If the movie is already watched:
    - [X] Clicking on the visual element should mark the movie as *not* watched.
    - [X] There should be visual feedback (such as the eye turning a different color) to show that the movie has not been watched.
- [X] **Sidebar**
  - [X] The website includes a side navigation bar.
  - [X] The sidebar has three pages:
    - [X] Home
    - [X] Favorites
    - [X] Watched
  - [X] The Home page displays all current movies in a grid view, the search bar, and the sort movies drop-down.
  - [X] The Favorites page displays all favorited movies in a grid view.
  - [X] The Watched page displays all watched movies in a grid view.

### Walkthrough Video

https://www.loom.com/embed/ef28001d62544c099c6896957f65a7ba?sid=a437df89-4106-44b2-b965-5da95b319107

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I think the topics seen in class were absolutely helpfull while working on this project. The react introduction really helped me, I have never used react before until this assignment
so it was pretty easy to follow because of the mentors. 

I felt unprepared mostly in the design (CSS) of the project, but with the help of the mentors I was able to find the usefull resources to add into my project

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
I would have done differently UI design mostly: working on the effects and UI interactions, also with the deductive design. Also, trying not to do a lot of fetch functions 
Aditional features: I would add a filter search (by Director, by Rating, etc.)

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I think I got aplauded by the colors that I used, also by the deductive UI design. 

Nothing did not went as planned, everything worked perfectly

My peers did pretty well with the UI interactive design, I would like to implement that in the future

### Open-source libraries used

N/A

### Shout out

Thank you so much to everyone, without your continous support and easy-to-follow lectures, it would have been much more difficult