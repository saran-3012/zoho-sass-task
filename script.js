// Dropdown 

const dropdownButtons = document.querySelectorAll('.dropdown');

dropdownButtons.forEach((dropdownButton) => {
    const dropdownContent = dropdownButton.querySelector('.dropdown-content');
    if(!dropdownContent) return;

    const dropdownContentEventListener = (e) => {
        if(dropdownButton.contains(e.target)) return;
        dropdownContent.style.display = 'none';
        document.removeEventListener('click', dropdownContentEventListener);
    };

    dropdownButton.addEventListener('click', (e) => {
        if(!dropdownContent.style.display || dropdownContent.style.display === 'none'){
            dropdownContent.style.display = 'flex';
            setTimeout(() => {
                document.addEventListener('click', dropdownContentEventListener);
            }, 0);
        }
    });
});


// Calander

const months = [
    {name: 'January', days: 31},
    {name: 'February', days: 28},
    {name: 'March', days: 31},
    {name: 'April', days: 30},
    {name: 'May', days: 31},
    {name: 'June', days: 30},
    {name: 'July', days: 31},
    {name: 'August', days: 31},
    {name: 'September', days: 30},
    {name: 'October', days: 31},
    {name: 'November', days: 30},
    {name: 'December', days: 31}
];
  
const isLeapYear = (year) => (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
const getMonthDays = (month, year) => (month != 1)? months[month].days : months[month].days + isLeapYear(year);

const calanders = document.querySelectorAll('.calander');

calanders.forEach((calander) => {
    const date = new Date();
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    let seletedDate = null;
    let seletedMonth = null;
    let seletedYear = null;

    const calanderLayout = document.createElement('div');
    calanderLayout.classList.add('calander-layout');
    calander.appendChild(calanderLayout);

    const calanderHeader = document.createElement('div');
    calanderHeader.classList.add('calander-header');
    calanderLayout.appendChild(calanderHeader);

    const calanderMonthYear = document.createElement('span');
    calanderHeader.appendChild(calanderMonthYear);

    const nextMonthBtn = document.createElement('button');
    nextMonthBtn.classList.add('button', 'next-month', 'float-right', 'br-circle', 'br-transparent');
    nextMonthBtn.textContent = '>';
    calanderHeader.appendChild(nextMonthBtn);

    const prevMonthBtn = document.createElement('button');
    prevMonthBtn.classList.add('button', 'prev-month', 'float-right', 'br-circle', 'br-transparent', 'mr-right-sm');
    prevMonthBtn.textContent = '<';
    calanderHeader.appendChild(prevMonthBtn);


    const calanderGrid = document.createElement('div');
    calanderGrid.classList.add('calander-grid');
    calanderLayout.appendChild(calanderGrid);

    for(const day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']){
        const calanderDayName = document.createElement('span');
        calanderDayName.classList.add('day-names');
        calanderDayName.textContent = day;
        calanderGrid.appendChild(calanderDayName);
    }

    const renderCalander = () => {

        calanderMonthYear.textContent = `${months[currentMonth].name} ${currentYear}`;

        const calanderDays = calanderGrid.childNodes;
        const childCount = calanderDays.length;

        for(let i=childCount-1; i>6; i--){
            calanderGrid.removeChild(calanderDays[i]);
        }

        const startingDay = new Date(`${currentMonth+1}-1-${currentYear}`).getDay();

        for(let i=0; i<startingDay; i++){
            const emptyCell = document.createElement('span');
            calanderGrid.appendChild(emptyCell);
        }

        const daysCount = getMonthDays(currentMonth, currentYear);

        for(let i=1; i<=daysCount; i++){
            const calanderDayNumber = document.createElement('span');
            calanderDayNumber.classList.add('day-numbers');
            calanderDayNumber.textContent = i;
            calanderGrid.appendChild(calanderDayNumber);
        }

    };

    renderCalander();

    nextMonthBtn.addEventListener('click', (e) => {
        currentMonth++;
        if(currentMonth > 11){
            currentMonth = 0;
            currentYear++;
        }
        renderCalander();
    });

    prevMonthBtn.addEventListener('click', (e) => {
        currentMonth--;
        if(currentMonth < 0){
            currentMonth = 11;
            currentYear--;
        }
        renderCalander();
    });

});


// Popup toggle

const addTaskPopupButton = document.querySelector('.add-task-popup-btn');
const popupCloseButton = document.querySelector('.popup-close-button');

const popupContainer = document.querySelector('.popup-container');

const openPopup = (e) => {
    popupContainer.style.display = 'flex';
};

const closePopup = (e) => {
    popupContainer.style.display = 'none';
};

addTaskPopupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup)