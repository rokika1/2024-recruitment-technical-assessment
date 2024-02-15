document.addEventListener('DOMContentLoaded', (event) => {
    fetch('courses.json')
        .then(response => response.json())
        .then(data => {
            displayCourses(data);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    changeTitleColour();
    clickableSearchBar();
});

function changeTitleColour() {
    const title = document.getElementById('mainTitle');
    title.style.color = 'royalblue';
    title.addEventListener('click', () => {
        if (title.style.color === 'royalblue') {
            title.style.color = 'hotpink';
        } else {
            title.style.color = 'royalblue';
        }
    });
}

function clickableSearchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('click', function() {
        // Adding popup
        const popup = document.createElement('div');
        popup.className = "popup";

        // Adding dismiss button to popup
        const dismissButton = document.createElement('button');
        dismissButton.textContent = 'dismiss';
        dismissButton.addEventListener('click', function() {
            document.body.removeChild(popup);
        });
        popup.appendChild(dismissButton);

        document.body.appendChild(popup);
    });
}


function displayCourses(courseData) {
    const coursesContainer = document.getElementById('coursesContainer');
    coursesContainer.innerHTML = '';

    courseData.forEach(course => {
        const courseBox = document.createElement('div');
        courseBox.className = 'courseBox';

        // Adding title
        const courseTitle = document.createElement('p');
        courseTitle.className = 'courseTitle';
        courseTitle.textContent = `${course.course_prefix}${course.course_code}`;
        courseBox.appendChild(courseTitle);

        // Adding description
        const description = document.createElement('p');
        description.className = 'courseDescription';
        description.textContent = course.course_title;
        courseBox.appendChild(description);

        // Adding ratings box
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'ratingContainer';
    
        const stars = document.createElement('p');
        stars.className = 'courseStars';
        stars.innerHTML = generateStarRating(course.average_stars);
        ratingContainer.appendChild(stars);

        const review = document.createElement('p');
        review.className = 'courseReview';
        review.textContent = `${course.total_reviews} reviews`;
        ratingContainer.appendChild(review);

        courseBox.appendChild(ratingContainer);

        // Adding terms
        const termsBox = document.createElement('div');
        generateOfferedTerms(course.offered_terms, termsBox);
        courseBox.appendChild(termsBox);

        coursesContainer.appendChild(courseBox);
    });
}

function generateStarRating(averageStars) {
    let stars = '';
    const roundedStars = Math.round(averageStars);
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedStars) {
            stars += '<span style="color: mediumpurple;">★</span>'
        } else {
            stars += '<span style="color: lightgray;">★</span>'
        }
    }
    return stars;
}

function generateOfferedTerms(terms, termsBox) {
    terms.forEach(term => {
        const offerTerm = document.createElement('span');
        offerTerm.className = 'offeredTerm';
        offerTerm.textContent = term;
        termsBox.appendChild(offerTerm);
    });
}
