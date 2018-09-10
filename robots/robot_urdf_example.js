//   CREATE ROBOT STRUCTURE

//////////////////////////////////////////////////
/////     DEFINE ROBOT AND LINKS
//////////////////////////////////////////////////

// create robot data object
robot = new Object(); // or just {} will create new object

// give the robot a name
robot.name = "urdf_example";

// initialize start pose of robot in the world
robot.origin = {xyz: [0,0.1,0], rpy:[0,0,0]};  

// specify base link of the robot; robot.origin is transform of world to the robot base
robot.base = "link1";  

// specify and create data objects for the links of the robot
robot.links = {"link1": {}, "link2": {}, "link3": {}, "link4": {} };

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

robot.joints.joint1 = {parent:"link1", child:"link2"};
robot.joints.joint1.origin = {xyz: [0.5,0.3,0.0], rpy:[0,0,0]};
robot.joints.joint1.axis = [-1.0,0.0,0];  // simpler axis 

robot.joints.joint2 = {parent:"link1", child:"link3"};
//robot.joints.joint2.origin = {xyz: [-0.2,0.5,0], rpy:[0,0,1.57]};
robot.joints.joint2.origin = {xyz: [-0.2,0.5,0], rpy:[0,0,Math.PI/2]};
//robot.joints.joint2.axis = [-0.707,0.707,0];
robot.joints.joint2.axis = [-Math.cos(Math.PI/4),Math.cos(Math.PI/4),0];

robot.joints.joint3 = {parent:"link3", child:"link4"};
//robot.joints.joint3.origin = {xyz: [0.5,0,0], rpy:[0,0,-1.57]};
robot.joints.joint3.origin = {xyz: [0.5,0,0], rpy:[0,0,-Math.PI/2]};
//robot.joints.joint3.axis = [0.707,-0.707,0];
robot.joints.joint3.axis = [Math.cos(Math.PI/4),-Math.cos(Math.PI/4),0];


// specify name of endeffector frame
robot.endeffector = {};
robot.endeffector.frame = "joint3";
robot.endeffector.position = [[0.5],[0],[0],[1]]

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

links_geom["link1"] = new THREE.CubeGeometry( 0.7+0.2, 0.5+0.2, 0.2 );
links_geom["link1"].applyMatrix( new THREE.Matrix4().makeTranslation((0.5-0.2)/2, 0.5/2, 0) );

links_geom["link2"] = new THREE.CubeGeometry( 0.5+0.2, 0.2, 0.2 );
links_geom["link2"].applyMatrix( new THREE.Matrix4().makeTranslation(0.5/2, 0, 0) );

links_geom["link3"] = new THREE.CubeGeometry( 0.5+0.2, 0.2, 0.2 );
links_geom["link3"].applyMatrix( new THREE.Matrix4().makeTranslation(0.5/2, 0, 0) );

links_geom["link4"] = new THREE.CubeGeometry( 0.5+0.2, 0.2, 0.2 );
links_geom["link4"].applyMatrix( new THREE.Matrix4().makeTranslation(0.5/2, 0, 0) );

