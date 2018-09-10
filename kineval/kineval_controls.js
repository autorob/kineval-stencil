
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | update robot state from controls

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

kineval.applyControls = function robot_apply_controls(curRobot) {
    // apply robot controls to robot kinematics transforms and joint angles, then zero controls
    // includes update of camera position based on base movement

    // update robot configuration from controls
    for (x in curRobot.joints) {

        // update joint angles
        if ( (typeof curRobot.joints[x].type !== 'undefined')
             || (typeof curRobot.joints[x].type !== 'fixed') ) { 

            if (isNaN(curRobot.joints[x].control))
                console.warn("kineval: control value for " + x +" is a nan");

            curRobot.joints[x].angle += curRobot.joints[x].control;
        }

    // STENCIL: enforce joint limits for prismatic and revolute joints


        // clear controls back to zero for next timestep
        curRobot.joints[x].control = 0;
    }

//console.log(curRobot); 
    // base motion
    curRobot.origin.xyz[0] += curRobot.control.xyz[0];
    curRobot.origin.xyz[1] += curRobot.control.xyz[1];
    curRobot.origin.xyz[2] += curRobot.control.xyz[2];
    curRobot.origin.rpy[0] += curRobot.control.rpy[0];
    curRobot.origin.rpy[1] += curRobot.control.rpy[1];
    curRobot.origin.rpy[2] += curRobot.control.rpy[2];

    // move camera with robot base
    camera_controls.object.position.x += curRobot.control.xyz[0];
    camera_controls.object.position.y += curRobot.control.xyz[1];
    camera_controls.object.position.z += curRobot.control.xyz[2];

    // zero controls now that they have been applied to robot
    curRobot.control = {xyz: [0,0,0], rpy:[0,0,0]}; 
}

