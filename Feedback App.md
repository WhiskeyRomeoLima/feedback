# Feedback App

### User requirements:

Web app that displays user reviews
    User should be able to select a numerical rating (1-10), submit, edit, and delete
    reviews, existing reviews will be displayed in more
    recent date submitted order. The number of reviews and
    average rating will be shown. Developer will mock up a design and present to users for approval.
    
### Technical Approach:  

Code:  React, state: React Context, React Router, CSS: Tailwind

### Approach:  Single Page with styled components

Broadly speaking, the following components will be used:
* Header containing a title
* Feedback form containing ratings to select from, text input to write feedback, and button to submit new feedback or delete a previous back.
* Stats listings the number of reviews and the average rating.
* A list of previous feedback. This will necessitate a Feedback list that generates Feedback items.