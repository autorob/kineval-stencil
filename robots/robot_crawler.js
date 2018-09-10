//   CREATE ROBOT STRUCTURE

//////////////////////////////////////////////////
/////     DEFINE ROBOT AND LINKS
//////////////////////////////////////////////////

// create robot data object
robot = new Object(); // or just {} will create new object

// give the robot a name
robot.name = "crawler";

// initialize start pose of robot in the world
robot.origin = {xyz: [0,1,0], rpy:[0,0,0]};  // held a bit over the ground plane

// specify base link of the robot; robot.origin is transform of world to the robot base
robot.base = "base";  

        
// specify and create data objects for the links of the robot
robot.links = {
    "base": {},  
    "leg1_upper": {}, 
    "leg1_middle": {}, 
    "leg1_lower": {}, 
    "leg2_upper": {}, 
    "leg2_middle": {}, 
    "leg2_lower": {}, 
    "leg3_upper": {}, 
    "leg3_middle": {}, 
    "leg3_lower": {}, 
    "leg4_upper": {}, 
    "leg4_middle": {}, 
    "leg4_lower": {}, 
    "leg5_upper": {}, 
    "leg5_middle": {}, 
    "leg5_lower": {}, 
    "leg6_upper": {}, 
    "leg6_middle": {}, 
    "leg6_lower": {}, 
    "leg7_upper": {}, 
    "leg7_middle": {}, 
    "leg7_lower": {}, 
    "leg8_upper": {}, 
    "leg8_middle": {}, 
    "leg8_lower": {}, 
};

// specify name of endeffector frame
robot.endeffector = {};
robot.endeffector.frame = "leg1_ankle";
robot.endeffector.position = [[0],[0],[0.9],[1]]

//////////////////////////////////////////////////
/////     DEFINE JOINTS AND KINEMATIC HIERARCHY
//////////////////////////////////////////////////

/*      joint definition template
        // specify parent/inboard link and child/outboard link
        robot.joints.joint1 = {parent:"link1", child:"link2"};
        // joint origin's offset transform from parent link origin
        robot.joints.joint1.origin = {xyz: [5,3,0], rpy:[0,0,0]}; 
        // joint rotation axis
        robot.joints.joint1.axis = [0.0,0.0,1.0]; 
*/


// roll-pitch-yaw defined by ROS as corresponding to x-y-z 
//http://wiki.ros.org/urdf/Tutorials/Create%20your%20own%20urdf%20file

// specify and create data objects for the joints of the robot
robot.joints = {};

robot.joints.leg1_hip = {parent:"base", child:"leg1_upper"};
robot.joints.leg1_hip.origin = {xyz: [0.3,0.0,0.9], rpy:[0,Math.PI/2,0]};
robot.joints.leg1_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg1_knee = {parent:"leg1_upper", child:"leg1_middle"};
robot.joints.leg1_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg1_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg1_ankle = {parent:"leg1_middle", child:"leg1_lower"};
robot.joints.leg1_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg1_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg2_hip = {parent:"base", child:"leg2_upper"};
robot.joints.leg2_hip.origin = {xyz: [0.3,0.0,-0.9], rpy:[0,Math.PI/2,0]};
robot.joints.leg2_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg2_knee = {parent:"leg2_upper", child:"leg2_middle"};
robot.joints.leg2_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg2_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg2_ankle = {parent:"leg2_middle", child:"leg2_lower"};
robot.joints.leg2_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg2_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg3_hip = {parent:"base", child:"leg3_upper"};
robot.joints.leg3_hip.origin = {xyz: [-0.3,0.0,0.9], rpy:[0,-Math.PI/2,0]};
robot.joints.leg3_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg3_knee = {parent:"leg3_upper", child:"leg3_middle"};
robot.joints.leg3_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg3_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg3_ankle = {parent:"leg3_middle", child:"leg3_lower"};
robot.joints.leg3_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg3_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg4_hip = {parent:"base", child:"leg4_upper"};
robot.joints.leg4_hip.origin = {xyz: [-0.3,0.0,-0.9], rpy:[0,-Math.PI/2,0]};
robot.joints.leg4_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg4_knee = {parent:"leg4_upper", child:"leg4_middle"};
robot.joints.leg4_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg4_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg4_ankle = {parent:"leg4_middle", child:"leg4_lower"};
robot.joints.leg4_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg4_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg5_hip = {parent:"base", child:"leg5_upper"};
robot.joints.leg5_hip.origin = {xyz: [0.3,0.0,0.3], rpy:[0,Math.PI/2,0]};
robot.joints.leg5_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg5_knee = {parent:"leg5_upper", child:"leg5_middle"};
robot.joints.leg5_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg5_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg5_ankle = {parent:"leg5_middle", child:"leg5_lower"};
robot.joints.leg5_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg5_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg6_hip = {parent:"base", child:"leg6_upper"};
robot.joints.leg6_hip.origin = {xyz: [0.3,0.0,-0.3], rpy:[0,Math.PI/2,0]};
robot.joints.leg6_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg6_knee = {parent:"leg6_upper", child:"leg6_middle"};
robot.joints.leg6_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg6_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg6_ankle = {parent:"leg6_middle", child:"leg6_lower"};
robot.joints.leg6_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg6_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg7_hip = {parent:"base", child:"leg7_upper"};
robot.joints.leg7_hip.origin = {xyz: [-0.3,0.0,0.3], rpy:[0,-Math.PI/2,0]};
robot.joints.leg7_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg7_knee = {parent:"leg7_upper", child:"leg7_middle"};
robot.joints.leg7_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg7_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg7_ankle = {parent:"leg7_middle", child:"leg7_lower"};
robot.joints.leg7_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg7_ankle.axis = [1.0,0.0,0.0]; 

robot.joints.leg8_hip = {parent:"base", child:"leg8_upper"};
robot.joints.leg8_hip.origin = {xyz: [-0.3,0.0,-0.3], rpy:[0,-Math.PI/2,0]};
robot.joints.leg8_hip.axis = [0.0,1.0,0.0]; 

robot.joints.leg8_knee = {parent:"leg8_upper", child:"leg8_middle"};
robot.joints.leg8_knee.origin = {xyz: [0.0,0.0,0.4], rpy:[-Math.PI/4,0,0]};
robot.joints.leg8_knee.axis = [1.0,0.0,0.0]; 

robot.joints.leg8_ankle = {parent:"leg8_middle", child:"leg8_lower"};
robot.joints.leg8_ankle.origin = {xyz: [0.0,0.0,0.6], rpy:[Math.PI/2,0,0]};
robot.joints.leg8_ankle.axis = [1.0,0.0,0.0]; 




//////////////////////////////////////////////////
/////     DEFINE LINK threejs GEOMETRIES
//////////////////////////////////////////////////

/*  threejs geometry definition template, will be used by THREE.Mesh() to create threejs object
    // create threejs geometry and insert into links_geom data object
    links_geom["link1"] = new THREE.CubeGeometry( 5+2, 2, 2 );

    // example of translating geometry (in object space)
    links_geom["link1"].applyMatrix( new THREE.Matrix4().makeTranslation(5/2, 0, 0) );

    // example of rotating geometry 45 degrees about y-axis (in object space)
    var temp3axis = new THREE.Vector3(0,1,0);
    links_geom["link1"].rotateOnAxis(temp3axis,Math.PI/4);
*/

// define threejs geometries and associate with robot links 
links_geom = {};

links_geom["base"] = new THREE.CubeGeometry( 1, 0.4, 2.3 );
links_geom["base"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0) );

links_geom["leg1_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg1_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg1_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg1_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg1_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg1_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg2_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg2_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg2_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg2_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg2_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg2_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg3_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg3_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg3_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg3_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg3_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg3_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg4_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg4_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg4_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg4_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg4_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg4_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg5_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg5_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg5_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg5_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg5_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg5_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg6_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg6_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg6_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg6_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg6_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg6_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg7_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg7_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg7_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg7_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg7_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg7_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );

links_geom["leg8_upper"] = new THREE.CubeGeometry( 0.3, 0.3, 0.3 );
links_geom["leg8_upper"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.15) );

links_geom["leg8_middle"] = new THREE.CubeGeometry( 0.3, 0.3, 0.6 );
links_geom["leg8_middle"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.3) );

links_geom["leg8_lower"] = new THREE.CubeGeometry( 0.3, 0.3, 1 );
links_geom["leg8_lower"].applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 0.5) );




