import {useEffect, useRef} from "react";
import {useGLTF, PerspectiveCamera, useAnimations} from "@react-three/drei";

function Sky(props) {
    const group = useRef();
    const {nodes, materials, animations} = useGLTF("/mdsel00.glb");
    const {actions, names} = useAnimations(animations, group);

    useEffect(() => {
        const action = actions[names[0]];
        action.reset().fadeIn(0).play();
        action.timeScale = 0.2;

        return () => action.stop();
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="mdsel_hai04">
                    <skinnedMesh
                        name="mdsel_sky00"
                        geometry={nodes.mdsel_sky00.geometry}
                        material={materials.mdsel_sky}
                        skeleton={nodes.mdsel_sky00.skeleton}
                    />
                    <primitive object={nodes.dummy_mdsel_hai04} />
                </group>
                <PerspectiveCamera
                    name="camera01_(title_cam)"
                    makeDefault={true}
                    far={10000}
                    near={0.1}
                    fov={35.983}
                    position={[-1.946, 17.624, 7.785]}
                    rotation={[0.371, 0, 0]}
                />
                <group name="si00a">
                    <mesh
                        name="sun01"
                        castShadow
                        receiveShadow
                        geometry={nodes.sun01.geometry}
                        material={materials.si00a_si00zbac007_1}
                        material-color={[1, 3, 3]}
                    />
                    <group name="si00a_1" rotation={[-Math.PI / 2, 0, 0]}>
                        <group
                            name="sun01_1"
                            position={[84.362, -70.79, 76.541]}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/mdsel00.glb");

export default Sky;
