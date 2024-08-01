const container = document.querySelector('.image-container');
const image = document.querySelector('.floating-image');

container.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    image.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

container.addEventListener('mouseenter', (e) => {
    image.style.transition = 'none';
});

container.addEventListener('mouseleave', (e) => {
    image.style.transition = 'all 0.5s ease';
    image.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
