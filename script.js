// ================= IMC =================
function calcular() {
    const pesoInput = document.getElementById('peso').value.replace(',', '.');
    const alturaInput = document.getElementById('altura').value.replace(',', '.');

    const peso = parseFloat(pesoInput);
    const altura = parseFloat(alturaInput);

    const resultado = document.getElementById('resultado');

    // VALIDAÇÃO
    if (!peso || !altura || peso <= 0 || altura <= 0) {
        resultado.style.color = "#ff4d4d";
        resultado.innerHTML = "⚠️ Insira peso e altura válidos (maiores que 0)";
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso ideal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else if (imc < 35) classificacao = 'Obesidade I';
    else if (imc < 40) classificacao = 'Obesidade II';
    else classificacao = 'Obesidade Severa';

    resultado.style.color = "#00f7ff";
    resultado.innerHTML = `Seu IMC é ${imc} <br> ${classificacao}`;
}

// ================= 3D =================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 7;

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas3d'),
    alpha: true,
    antialias: true
});

renderer.setSize(420, 420);

// Luz
const light = new THREE.PointLight(0x00f7ff, 2);
light.position.set(2, 2, 5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.2));

// Loader
const loader = new THREE.GLTFLoader();

let model; // 👈 importante

loader.load(
    'model.glb',
    function (gltf) {
        model = gltf.scene;

        // HOLOGRAMA
        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x00f7ff,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6
                });
            }
        });

        model.scale.set(0.3, 0.3, 0.3);
        model.position.y = -2;

        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar modelo:', error);
    }
);

// ANIMAÇÃO (fora do loader — MUITO IMPORTANTE)
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

animate();
