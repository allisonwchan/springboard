"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/* When user clicks favorites on navbar, show favorites list */
function showFavorites() {
  console.debug("showFavorites");
  hidePageComponents();
  putFavoritesListOnPage();
}

$navFavorites.on("click", showFavorites)

/* Add story on click on "submit" */

function submitStory(evt) {
  console.debug("submitStory");
  hidePageComponents();
  $storyForm.show();
  putStoriesOnPage();
}

$navSubmit.on("click", submitStory);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $loginForm.hide();
  $signupForm.hide();
  $navSubmit.show();
  $navFavorites.show();
  $navUserStories.show();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
