Storj Twitter-lite

Start up

```npm install && npm start```

# General Notes
* Built with create-react-app 
* Backend [firebase.com](https://console.firebase.google.com/project/storj-dex-mills)
* UX/UI package- [Material UI](https://material-ui.com/)

* Dev dependencies
```
    "firebase": "^5.2.0",
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",
    "typeface-roboto": "0.0.54" 
```

* Firebase package
  - install `npm install firebase --save`


## ___Dev Notes___

- I went with client side rendering as when I first approched the project it appeared to be the cleanest route for the size. With that being said if the user count was to grow and scability was an issue I would lean toward serve side to take the weight off of the browser to handle the request. It would be faster, but for a small project client side rendering will work.

  - With that being said, once I tried to go back and adjust the state to display the user when the location was imputed with a user name provided much headache and I would approch this problem in the future with more weight on pushing towards serve side rendering. This would also help with state mangement.

-Provided that material UI is a great resourse for designing great UX/UI it does come with headaches. The major bug that I ran into was switches with directly changing state with out an implict ```this.setState({})``` called. Manged to work around issue. It provided a long time of hair pulling and explitives.

-There is one error that I tried to work around which is calling a function in the render part of UserMess.js. When I reached this point, it was futher along and with the time frame I found a quick work around. Going on I would refactor it and have most of the conditional logic done server side. 

-The ability to add users in the backed with the struture was simple. Some of the data is redundant and could be trimmed with a refactor.

