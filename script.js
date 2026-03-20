// ================= IMC =================
function calcular() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const resultado = document.getElementById('resultado');

    if (peso !== '' && altura !== '') {
        const imc = (peso / (altura * altura)).toFixed(2);
        let classificacao = '';

        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 25) classificacao = 'Peso ideal';
        else if (imc < 30) classificacao = 'Sobrepeso';
        else if (imc < 35) classificacao = 'Obesidade I';
        else if (imc < 40) classificacao = 'Obesidade II';
        else classificacao = 'Obesidade Severa';

        resultado.innerHTML = `Seu IMC é ${imc} <br> ${classificacao}`;
    } else {
        resultado.innerHTML = 'Preencha todos os campos!';
    }
}

// ================= 3D =================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

// 👉 MAIS LONGE AINDA
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

loader.load(
    'model.glb',
    function (gltf) {
        const model = gltf.scene;

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

        // 🔥 AJUSTE MAIS FORTE
        model.scale.set(0.3, 0.3, 0.3); // BEM menor
        model.position.y = -2;          // centraliza

        scene.add(model);

        function animate() {
            requestAnimationFrame(animate);

            model.rotation.y += 0.005;

            renderer.render(scene, camera);
        }

        animate();
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar modelo:', error);
    }
);
