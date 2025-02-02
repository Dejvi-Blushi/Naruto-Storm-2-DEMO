import {useEffect, useRef} from "react";
import {useGLTF, useAnimations, Outlines} from "@react-three/drei";

function SasukeHebi(props) {
    const group = useRef();
    const {nodes, materials, animations} = useGLTF("/2sskbod1.glb");
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
                <group name="2sskbod1">
                    <skinnedMesh
                        name="2ssk00t0_body"
                        geometry={nodes["2ssk00t0_body"].geometry}
                        material={materials["2sskbody1"]}
                        skeleton={nodes["2ssk00t0_body"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="2ssk00t0_eye_l_1"
                        geometry={nodes["2ssk00t0_eye_l_1"].geometry}
                        material={materials["2sskeyel"]}
                        skeleton={nodes["2ssk00t0_eye_l_1"].skeleton}
                    />
                    <skinnedMesh
                        name="2ssk00t0_eye_r_1"
                        geometry={nodes["2ssk00t0_eye_r_1"].geometry}
                        material={materials["2sskeyer"]}
                        skeleton={nodes["2ssk00t0_eye_r_1"].skeleton}
                    />
                    <group name="2ssk00t0_jacket01_1">
                        <skinnedMesh
                            name="2ssk00t0_jacket01_2"
                            geometry={nodes["2ssk00t0_jacket01_2"].geometry}
                            material={materials["2sskbody2"]}
                            skeleton={nodes["2ssk00t0_jacket01_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="2ssk00t0_jacket01_3"
                            geometry={nodes["2ssk00t0_jacket01_3"].geometry}
                            material={materials["2sskbody1"]}
                            skeleton={nodes["2ssk00t0_jacket01_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <group name="2ssk00t0_kami_1">
                        <skinnedMesh
                            name="2ssk00t0_kami_2"
                            geometry={nodes["2ssk00t0_kami_2"].geometry}
                            material={materials["2sskbody3"]}
                            skeleton={nodes["2ssk00t0_kami_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="2ssk00t0_kami_3"
                            geometry={nodes["2ssk00t0_kami_3"].geometry}
                            material={materials["2sskbody2"]}
                            skeleton={nodes["2ssk00t0_kami_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <group name="2ssk00t0_kao_1">
                        <skinnedMesh
                            name="2ssk00t0_kao_2"
                            geometry={nodes["2ssk00t0_kao_2"].geometry}
                            material={materials["2sskbody1"]}
                            skeleton={nodes["2ssk00t0_kao_2"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                        <skinnedMesh
                            name="2ssk00t0_kao_3"
                            geometry={nodes["2ssk00t0_kao_3"].geometry}
                            material={materials["2sskbody4"]}
                            skeleton={nodes["2ssk00t0_kao_3"].skeleton}
                        >
                            <Outlines angle={0} thickness={1} color="black" />
                        </skinnedMesh>
                    </group>
                    <skinnedMesh
                        name="2ssk00t0_lower_teeth_1"
                        geometry={nodes["2ssk00t0_lower_teeth_1"].geometry}
                        material={materials["2sskbody1"]}
                        skeleton={nodes["2ssk00t0_lower_teeth_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="2ssk00t0_sword02_1"
                        geometry={nodes["2ssk00t0_sword02_1"].geometry}
                        material={materials["2sskbody1"]}
                        skeleton={nodes["2ssk00t0_sword02_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="2ssk00t0_tongue_1"
                        geometry={nodes["2ssk00t0_tongue_1"].geometry}
                        material={materials["2sskbody1"]}
                        skeleton={nodes["2ssk00t0_tongue_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <skinnedMesh
                        name="2ssk00t0_upper_teeth_1"
                        geometry={nodes["2ssk00t0_upper_teeth_1"].geometry}
                        material={materials["2sskbody1"]}
                        skeleton={nodes["2ssk00t0_upper_teeth_1"].skeleton}
                    >
                        <Outlines angle={0} thickness={1} color="black" />
                    </skinnedMesh>
                    <primitive object={nodes["2ssk00t0_trall"]} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/2sskbod1.glb");

export default SasukeHebi;
