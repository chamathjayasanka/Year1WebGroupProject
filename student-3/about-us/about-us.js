/*
    Author:     A.L.A. FALIH
    Date:       March 31st, 2023
    Purpose:    Common CSS styles for all pages
    Copyright:  © 2023, All rights reserved
*/
const members = document.querySelectorAll('.member');

members.forEach((member) => {
  const img = member.querySelector('img');
  const name = member.querySelector('.name');
  const role = member.querySelector('.role');

  img.addEventListener('mouseover', () => {
    name.textContent = img.dataset.name;
    role.textContent = img.dataset.role;
  });

});
