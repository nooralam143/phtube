const loadCategories = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await response.json();
        loadCategory(data);
    } catch (error) {
        console.log(error);
    }

}
const loadCategory = (data) => {
    // console.log(data);
    const categoryId = document.getElementById('category');
    categoryId.textContent = '';
    data.data.forEach((category) => {       
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category.category_id}')" class="btn btn-category">${category.category}</a>
        `
        categoryId.appendChild(div);
    })

    let btnCategory = document.querySelectorAll('.btn-category');
    btnCategory[0].classList.add('btn-active');
}

const handleLoadCategory = async (categoryId = '1000') => {
    cardLoadingSpinner(true);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardId = document.getElementById('card');
    cardId.textContent = '';
    const noContent = document.getElementById('no-content-id');
    noContent.textContent = '';


    let btnCategory = document.querySelectorAll('.btn-category');



    btnCategory.forEach((button) => {
        button.addEventListener('click', () => {
            // Remove 'btn-active' class from all buttons
            btnCategory.forEach((btn) => {
                btn.classList.remove('btn-active');
            });

            // Add 'btn-active' class to the clicked button
            button.classList.add('btn-active');
            
        });

    });


    if (data.data.length == 0) {

        const div = document.createElement('div');
        div.innerHTML = `
    <div class="noContent-height flex flex-col justify-center items-center bg-base-100 ">
        <div>
            <figure class=""><img class="" src="img/nocontent.svg" alt="No Content" /></figure>
        </div>
        <h2 class="font-bold text-base text-[#171717]">Oops!! Sorry, There is no content here</h2>
    </div>
    `
        noContent.appendChild(div);
    } else {
        data.data.forEach((cardInfo) => {

            const seconds = cardInfo.others.posted_date;
            const { hours, minutes } = convertSecondsToHoursMinutes(seconds);

            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card card-compact w-96 mx-auto  bg-base-100 shadow-xl">
        <div class="relative">
            <div>
                <figure class="w-96"><img class="w-full h-60" src="${cardInfo.thumbnail}" alt="video" /></figure>
            </div>
           
            ${seconds > 0 ? `
            <p class="text-right absolute right-16 bottom-5 bg-[#171717] text-white rounded-md text-sm">
              ${hours} hrs, ${minutes} min ago
            </p>
          </div>` : ''}
        <div class="m-2">
            <div class="flex gap-2">
                    <img class="rounded-full w-10 h-10" src="${cardInfo.authors[0].profile_picture}" alt="user1">
                    <div>
                        <h2 class="card-title font-bold text-base text-[#171717]">${cardInfo.title}</h2>
                        <div class="flex justify-start">
                            <p class="text-sm mr-2 text-[#171717b3] ">${cardInfo.authors[0].profile_name}</p>
                            ${cardInfo.authors[0].verified ? '<img src="img/verify.svg" alt="verify">' : ''}
                        </div>
                        <p class="text-sm text-[#171717b3]">${cardInfo.others.views}views</p>
                    </div>
            </div>
        </div>
        </div>
        `
            cardId.appendChild(div);

        })
    }

    cardLoadingSpinner(false);
}
// Spinner function for category
const categoryLoadingSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-category-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Spinner function for Card
const cardLoadingSpinner = (isLoading) => {

    const loadingSpinner = document.getElementById('loading-card-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// convert Second to houre & minute
function convertSecondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const restseconds = seconds % 3600;
    const minutes = Math.floor(restseconds / 60);

    return { hours, minutes };
}


loadCategories();
handleLoadCategory();
Shortdisplay();
cardLoadingSpinner(true);
