let camera, renderer, scene;

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
scene = new THREE.Scene()
renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5;

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

const material = new THREE.PointsMaterial({
    size: 0.005
})

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    tranparent: true,
    color: 'darkblue',
    blending: THREE.AdditiveBlending
})

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particlesMesh)

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}

gsap.registerPlugin(ScrollTrigger)
const tl = gsap.timeline()

tl
    .to('#box', { x: 0, duration: 1, scrollTrigger: { trigger: '#box', scrub: true } })
    .to('#box1', { x: 0, duration: 1, scrollTrigger: { trigger: '#box', scrub: true } })
    .to('#box2', { x: 0, duration: 1, scrollTrigger: { trigger: '#box', scrub: true } })
    .to('#box3', { x: 0, duration: 1, scrollTrigger: { trigger: '#box', scrub: true } })
    .to('#box4', { x: 0, duration: 1, scrollTrigger: { trigger: '#box', scrub: true } })

tl
    .to('#text1', { visibility: 'visible', scrollTrigger: { trigger: '#text1', start: 1600, scrub: true } })
    .to('#text2', { visibility: 'visible', scrollTrigger: { trigger: '#text2', start: 1800, scrub: true } })
    .to('#text3', { visibility: 'visible', scrollTrigger: { trigger: '#text3', start: 2000, scrub: true } })
    .to('#text4', { visibility: 'visible', scrollTrigger: { trigger: '#text4', start: 2200, scrub: true } })

gsap.to('#car', {
    x: innerWidth,
    duration: 2,
    scrollTrigger: {
        trigger: '#car',
        start: 'top top',
        scrub: true,
        pin: true
    }
})

const text = document.getElementsByClassName('name')
const para = document.getElementsByClassName('para')
const letter = document.getElementById('single')
const task = document.getElementById('task')
const section = document.getElementById('section')
const word = document.getElementById('word')

console.log(text[0])
console.log("para", para)

const mouse = new THREE.Vector2()
console.log("misu", mouse)

window.addEventListener('scroll', (e) => {
    const clientY = window.pageYOffset
    console.log("clientY", clientY)
    if (clientY > 80) {
        para[0].style.opacity = 0.5
        para[1].style.opacity = 0.5
        word.style.letterSpacing = 20 + 'px'
    } else {
        para[0].style.opacity = 1
        para[1].style.opacity = 1
        word.style.letterSpacing = 10 + 'px'
    }
    if (clientY > 2400 || clientY < 1000) {
        task.style.opacity = 0
    } else {
        task.style.opacity = 1
    }

    // if (clientY > 200) {
    //     console.log("huree")
    //     // text[0].style.opacity = 0.3
    //     // text[1].style.opacity = 0.3
    //     word.style.letterSpacing = 20 + 'px'
    // } else {

    // }
})


window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    const elapsedTime = clock.getElapsedTime()
    particlesMesh.rotation.y = -0.1 * elapsedTime

    if (mouseX > 0) {
        particlesMesh.rotation.x = mouseY * (elapsedTime * 0.00008)
        particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
    }
}

animate();

