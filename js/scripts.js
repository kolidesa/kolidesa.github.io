/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    if (document.querySelector("#yearsCodingExperience")) {
        document.querySelector("#yearsCodingExperience").innerText = new Date().getFullYear() - 2015;
    }


    const dropbox = document.getElementById('dropbox');
     const fileInput = document.getElementById('fileInput');
     const status = document.getElementById('status');

     dropbox.addEventListener('click', () => fileInput.click());

     dropbox.addEventListener('dragover', (e) => {
         e.preventDefault();
         dropbox.classList.add('dragover');
     });

     dropbox.addEventListener('dragleave', () => {
         dropbox.classList.remove('dragover');
     });

     dropbox.addEventListener('drop', (e) => {
         e.preventDefault();
         dropbox.classList.remove('dragover');
         handleFiles(e.dataTransfer.files);
     });

     fileInput.addEventListener('change', () => {
         handleFiles(fileInput.files);
     });

});

async function handleFiles(files) {
    if (files.length > 2) {
        alert("Please upload up to 2 files only.");
        return;
    }

    const status = document.getElementById('status');
    status.textContent = "Processing files...";

    try {
        let followingJson = null;
        let followersJson = null;

        // Iterate over the files
        for (const file of files) {
            const fileContent = await readFileAsText(file);

            if (file.name === 'following.json') {
                followingJson = fileContent;
            } else if (file.name === 'followers_1.json') {
                followersJson = fileContent;
            }
        }

        if (!followingJson || !followersJson) {
            status.textContent = "Please upload both 'following.json' and 'followers_1.json'.";
            return;
        }

        // Process the files
        const following = JSON.parse(followingJson);
        const followers = JSON.parse(followersJson);

        const followingArray = [];
        const followersArray = [];
        const notFollowingBack = [];
        const followersNotFollowingBack = [];

        // Extract following list
        //following.relationships_following.forEach(item => {
            //const tempVal = item.string_list_data[0].value;
            //followingArray.push(tempVal);
        //});

        let followingList = [];

        // Handle old vs new JSON structure
        if (Array.isArray(following.relationships_following)) {
            followingList = following.relationships_following;
        } else if (
            following.relationships_following &&
            Array.isArray(following.relationships_following.relationships_following)
        ) {
            followingList = following.relationships_following.relationships_following;
        } else {
            throw new Error("Unrecognized format for following.json");
        }

        //console.log(followingList);
        
        followingList.forEach(item => {
            // New Instagram export stores username in "title"
            const tempVal = item.title?.trim();

            if (tempVal) {
                followingArray.push(tempVal);
            }
        });

        // Extract followers list and find accounts not following you back
        followers.forEach(item => {
            const tempVal = item.string_list_data[0].value;
            followersArray.push(tempVal);

            if (!followingArray.includes(tempVal)) {
                notFollowingBack.push(tempVal);
            }
        });

        // Find accounts you don't follow back
        followingArray.forEach(user => {
            if (!followersArray.includes(user)) {
                followersNotFollowingBack.push(user);
            }
        });

        // Prepare results
        let strResults = '<b>Accounts you don\'t follow back:</b><br>';
        notFollowingBack.forEach(user => {
            strResults += `${user}<br>`;
        });

        strResults += '<br><b>Accounts that don\'t follow you back:</b><br>';
        followersNotFollowingBack.forEach(user => {
            strResults += `${user}<br>`;
        });

        // Display the results
        status.innerHTML = strResults;
    } catch (error) {
        status.textContent = "An error occurred while processing the files.";
        console.error(error);
    }
}

// Helper function to read a file as text
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
}