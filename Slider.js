
let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

thumbnail.appendChild(thumbnailItems[0]);

// Function for next button 
nextBtn.onclick = function () {
    moveSlider('next');
};

// Function for prev button 
prevBtn.onclick = function () {
    moveSlider('prev');
};

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function () {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true }); // Remove the event listener after it's triggered once
}

// Automatically move the slider to the next item
let autoSlideInterval = setInterval(() => {
    moveSlider('next');
}, 3000); // Change slide every 3 seconds

// Optional: Pause auto-slide when hovering over the slider
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        moveSlider('next');
    }, 3000);
});
