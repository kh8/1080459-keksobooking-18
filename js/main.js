'use strict';

var avatars = [1,2,3,4,5,6,7,8];
var ads = []

var generateAds = function () {
  for (var i = 1; i < 8; i++) {
    var ad = {
      author: {
        avatar: ''
      },
      offet: {
        title: '',
        address: '',
        price: 0,
        type: '',
        rooms: 0,
        guests: 0,
        checkin: '',
        checkout: '',
        features: [],
        description: '',
        photos: []
      },
      location: {
        x: 0,
        y:0
      }
    };
    ad.author.avatar = 'img/avatars/user0' + i + '.png';
    ads.push (ad);
  }
  console.log(ads);
};

generateAds();
