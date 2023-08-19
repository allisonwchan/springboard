"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  // if a user is logged in, show favorite/not-favorite star
  const showStar = Boolean(currentUser);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Make favorite/not-favorite star for story */

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Put favorites list on page. */

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoritesList.empty();

  if (currentUser.favorites.length === 0) {
    $favoritesList.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritesList.append($story);
    }
  }

  $favoritesList.show();
}

/* Add inputted story to page */
async function addStoryToPage(evt) {
  evt.preventDefault();
  console.debug("addStoriesToPage");

  // get user input for story
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();

  await storyList.addStory(currentUser, {title: title, author: author, url: url});

  $storyForm.hide();
}

$storyForm.on("submit", addStoryToPage);

/* add favorite stories to page */
function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoritesList.empty();

  if (currentUser.favorites.length === 0) {
    $favoritesList.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritesList.append($story);
    }
  }

  $favoritesList.show();
}

/** Handle favorite/un-favorite a story */

async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // see if the item is already favorited (checking by presence of star)
  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavStory(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavStory(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleStoryFavorite);