import React from 'react';

export default function Home() {
    // return <div> You are on your home page </div>
    var now = new Date();
    var  html =JSON.stringify({Time:now});
    return html
}
