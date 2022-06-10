import ProfileRatingView from '../view/profile-rating-view.js';
import {render} from '../framework/render.js';

export default class ProfileRatingPresenter {
  init(profileRatingContainer, rating) {
    render(new ProfileRatingView(rating), profileRatingContainer);
  }
}
