import {useEffect, useRef} from "react";
import {useGLTF, useAnimations, Outlines} from "@react-three/drei";

function NarutoPTS(props) {
    const group = useRef();
    const {nodes, materials, animations} = useGLTF("/1nrtbod1.glb");
    const {actions, names} = useAnimations(animations, group);

    useEffect(() => {
        const action = actions[names[0]];
        action.reset().fadeIn(0).play();
        action.timeScale = 1;

        return () => action.stop();
    }, []);

    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                <group name="1nrtbod1">
                    <group name="1nrt00t0_body">
                        <skinnedMesh
                            name="1nrt00t0_body_2"
                            geometry={nodes["1nrt00t0_body_2"].geometry}
                            material={materials["1nrtbody1"]}
                            skeleton={nodes["1nrt00t0_body_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_body_3"
                            geometry={nodes["1nrt00t0_body_3"].geometry}
                            material={materials["1nrtbody2"]}
                            skeleton={nodes["1nrt00t0_body_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <skinnedMesh
                        name="1nrt00t0_eye_l_1"
                        geometry={nodes["1nrt00t0_eye_l_1"].geometry}
                        material={materials["1nrteye_l"]}
                        skeleton={nodes["1nrt00t0_eye_l_1"].skeleton}
                    />
                    <skinnedMesh
                        name="1nrt00t0_eye_r_1"
                        geometry={nodes["1nrt00t0_eye_r_1"].geometry}
                        material={materials["1nrteye_r"]}
                        skeleton={nodes["1nrt00t0_eye_r_1"].skeleton}
                    />
                    <group name="1nrt00t0_kami_1">
                        <skinnedMesh
                            name="1nrt00t0_kami_2"
                            geometry={nodes["1nrt00t0_kami_2"].geometry}
                            material={materials["1nrtbody11"]}
                            skeleton={nodes["1nrt00t0_kami_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_kami_3"
                            geometry={nodes["1nrt00t0_kami_3"].geometry}
                            material={materials["1nrtbody1"]}
                            skeleton={nodes["1nrt00t0_kami_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_kami_4"
                            geometry={nodes["1nrt00t0_kami_4"].geometry}
                            material={materials["1nrtbody2"]}
                            skeleton={nodes["1nrt00t0_kami_4"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_kami_5"
                            geometry={nodes["1nrt00t0_kami_5"].geometry}
                            material={materials["1nrtbody12"]}
                            skeleton={nodes["1nrt00t0_kami_5"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <group name="1nrt00t0_kao_1">
                        <skinnedMesh
                            name="1nrt00t0_kao_2"
                            geometry={nodes["1nrt00t0_kao_2"].geometry}
                            material={materials["1nrtbody12"]}
                            skeleton={nodes["1nrt00t0_kao_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_kao_3"
                            geometry={nodes["1nrt00t0_kao_3"].geometry}
                            material={materials["1nrtbody1"]}
                            skeleton={nodes["1nrt00t0_kao_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="1nrt00t0_kao_4"
                            geometry={nodes["1nrt00t0_kao_4"].geometry}
                            material={materials["1nrtbody11"]}
                            skeleton={nodes["1nrt00t0_kao_4"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <skinnedMesh
                        name="1nrt00t0_lower_teeth_1"
                        geometry={nodes["1nrt00t0_lower_teeth_1"].geometry}
                        material={materials["1nrtbody1"]}
                        skeleton={nodes["1nrt00t0_lower_teeth_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="1nrt00t0_tongue_1"
                        geometry={nodes["1nrt00t0_tongue_1"].geometry}
                        material={materials["1nrtbody2"]}
                        skeleton={nodes["1nrt00t0_tongue_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="1nrt00t0_upper_teeth_1"
                        geometry={nodes["1nrt00t0_upper_teeth_1"].geometry}
                        material={materials["1nrtbody1"]}
                        skeleton={nodes["1nrt00t0_upper_teeth_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <primitive object={nodes["1nrt00t0_trall"]} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/1nrtbod1.glb");

export default NarutoPTS;
