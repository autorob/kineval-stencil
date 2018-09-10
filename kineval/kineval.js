
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | core functions

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/



//////////////////////////////////////////////////
/////     KINEVAL OBJECT CONSTRUCTION AND START
//////////////////////////////////////////////////

// create the kineval object/namespace
kineval = {};
console.log("KinEval: Kinematic Evaluator 3");

// function to initialize KinEval and start its animation loop
kineval.start = function kinevalExecute() {

    console.log(" **** >>> kineval.start"); 
    // KinEval should not do anything until there is a robot and a world loaded
    var x;
    for (x in robot.links) { 
        if (typeof links_geom[x] === 'undefined') {
            console.log("waiting for robot geometries to load"); 
            //requestAnimationFrame(kineval.start);
            setTimeout(kineval.start,1000);
            return; 
        }
    }
    //if (typeof robotLoaded !== 'undefined')
    //    if (robotLoaded === false) { console.log("waiting for robot to load"); return; requestAnimationFrame(kineval.start) }
    //if (typeof world.loaded !== 'undefined')
    //    if (world.loaded === false) return;

    // KinEval uses init() to initialize threejs scene, user input, and robot kinematics
    // STUDENT: you should use my_init() instead
    kineval.init();

    // KinEval uses animate() as the main animation loop maintained by threejs 
    // STUDENT: you should use my_animate() instead
    kineval.animate();
}

kineval.init = function init() {

    // initialize robot kinematics
    kineval.initRobot();  

    // create kineval params object and set initial values
    kineval.initParameters();

    // initialize threejs and rendering scene
    kineval.initScene();

    // initialize interface parameters and interaction interfaces
    kineval.initInteraction();


    // initialize rosbridge connection to robot running ROS, if available
    // KE 2 : uncomment and add toggle 
    //kineval.initrosbridge();

    // call user's initialization
    my_init();
}

//////////////////////////////////////////////////
/////     ANIMATION AND INTERACTION FUNCTIONS
//////////////////////////////////////////////////

kineval.animate = function animate() {

    // THIS IS THE MAIN ANIMATION LOOP

    // note: three.js includes requestAnimationFrame shim
    // alternative to using setInterval for updating in-browser drawing
    // this effectively requests that the animate function be called again for next draw
    // http://learningwebgl.com/blog/?p=3189

    requestAnimationFrame( kineval.animate );

    // call user's animation routine
    my_animate();

    // update camera position and render scene
    kineval.renderScene();
}


kineval.robotDraw = function drawRobot() {

    // robot links
    for (x in robot.links) {
   
        // KE : properly scope global variable robot_material
        if (kineval.params.display_wireframe)
            robot_material.wireframe = true;
        else
            robot_material.wireframe = false;

        // toggled robot link display
        if (kineval.params.display_links) {
            var tempmat = matrix_2Darray_to_threejs(robot.links[x].xform);
            simpleApplyMatrix(robot.links[x].geom,tempmat);
            robot.links[x].geom.visible = true;
        }
        else
            robot.links[x].geom.visible = false;

        // toggled robot link axes display
        if (kineval.params.display_links_axes) {
            robot.links[x].axis_geom_x.visible = true;
            robot.links[x].axis_geom_y.visible = true;
            robot.links[x].axis_geom_z.visible = true;
        }
        else {
            robot.links[x].axis_geom_x.visible = false;
            robot.links[x].axis_geom_y.visible = false;
            robot.links[x].axis_geom_z.visible = false;
        }

        // toggled robot link collision bounding box display
        if (kineval.params.display_collision_bboxes)
            robot.links[x].bbox_mesh.visible = true;
        else
            robot.links[x].bbox_mesh.visible = false;
    }

    // display bounding box for robot link in collision
    if (robot.collision)
        robot.links[robot.collision].bbox_mesh.visible = true;

    // toggled display of robot base axes 
    if (kineval.params.display_base_axes) {
            robot.links[robot.base].axis_geom_x.visible = true;
            robot.links[robot.base].axis_geom_y.visible = true;
            robot.links[robot.base].axis_geom_z.visible = true;
    }

    // robot joints
    for (x in robot.joints) {

        // toggled robot joint display
        if (kineval.params.display_joints) {
            var tempmat = matrix_2Darray_to_threejs(robot.joints[x].xform);
            simpleApplyMatrix(robot.joints[x].geom,tempmat);
            robot.joints[x].geom.visible = true;
        }
        else
            robot.joints[x].geom.visible = false;

        // toggled robot joint axes display
        if (kineval.params.display_joints_axes) {
            robot.joints[x].axis_geom_x.visible = true;
            robot.joints[x].axis_geom_y.visible = true;
            robot.joints[x].axis_geom_z.visible = true;
        }
        else {
            robot.joints[x].axis_geom_x.visible = false;
            robot.joints[x].axis_geom_y.visible = false;
            robot.joints[x].axis_geom_z.visible = false;
        }
 
    }
    
    // toggled display of joint with active control focus
    if (kineval.params.display_joints_active) {
        x = kineval.params.active_joint;
        var tempmat = matrix_2Darray_to_threejs(robot.joints[x].xform);
        simpleApplyMatrix(robot.joints[x].geom,tempmat);
        robot.joints[x].geom.visible = true;
        if (kineval.params.display_joints_active_axes) {
            robot.joints[x].axis_geom_x.visible = true;
            robot.joints[x].axis_geom_y.visible = true;
            robot.joints[x].axis_geom_z.visible = true;
        }
    }

    if (typeof matrix_multiply !== 'undefined') { // hacked for stencil

    // display robot endeffector
    endeffector_mat = [];
    if (kineval.params.ik_orientation_included)
        endeffector_mat = matrix_2Darray_to_threejs(matrix_multiply(robot.joints[robot.endeffector.frame].xform,generate_translation_matrix(robot.endeffector.position[0],robot.endeffector.position[1],robot.endeffector.position[2])));
    else {
        endeffector_world = matrix_multiply(robot.joints[robot.endeffector.frame].xform,robot.endeffector.position);
        endeffector_mat = matrix_2Darray_to_threejs(generate_translation_matrix(endeffector_world[0],endeffector_world[1],endeffector_world[2]));
    }
    simpleApplyMatrix(endeffector_geom,endeffector_mat);

    // display endeffector target
    if (kineval.params.ik_orientation_included)
        var target_mat = matrix_2Darray_to_threejs(
            matrix_multiply(
                generate_translation_matrix(kineval.params.ik_target.position[0][0],kineval.params.ik_target.position[1][0],kineval.params.ik_target.position[2][0]),
                matrix_multiply(
                    generate_rotation_matrix_X(kineval.params.ik_target.orientation[0]),
                    matrix_multiply(
                        generate_rotation_matrix_Y(kineval.params.ik_target.orientation[1]),
                        generate_rotation_matrix_Z(kineval.params.ik_target.orientation[2])
        ))));
    else 
        var target_mat = matrix_2Darray_to_threejs(generate_translation_matrix(kineval.params.ik_target.position[0][0],kineval.params.ik_target.position[1][0],kineval.params.ik_target.position[2][0]));
    simpleApplyMatrix(target_geom,target_mat);
    } // hacked for stencil

    if ((kineval.params.update_ik)||(kineval.params.persist_ik)) { 
        endeffector_geom.visible = true;
        target_geom.visible = true;
    }
    else {
        endeffector_geom.visible = false;
        target_geom.visible = false;
    }
}


kineval.renderScene = function renderScene() {

    // make sure camera controls (THREE OrbitControls) are looking at the robot base
    camera_controls.target.x = robot.links[robot.base].geom.position.x;
    camera_controls.target.y = robot.links[robot.base].geom.position.y;
    camera_controls.target.z = robot.links[robot.base].geom.position.z;

    // threejs rendering update
    renderer.render( scene, camera );
}


//////////////////////////////////////////////////
/////     INITIALIZATION FUNCTION DEFINITONS
//////////////////////////////////////////////////

kineval.initInteraction = function initInteraction() {

    // instantiate threejs keyboard controls, for interactive controls
    keyboard = new THREEx.KeyboardState();

    // create events and handlers for interaction controls
    kineval.initKeyEvents();


    // create GUI display object and configure
    kineval.initGUIDisplay();

}

kineval.initParameters = function initParameters() {

    // create params object 
    kineval.params = {};

    kineval.params.just_starting = true;  // set to true as default, set false once starting forward kinematics project

    // sets request for single update or persistent update of robot pose based on IK, setpoint controller, etc. 
    kineval.params.update_pd = false;
    kineval.params.persist_pd = false;
    kineval.params.update_pd_clock = false;      
    kineval.params.update_pd_dance = false;      
    kineval.params.update_ik = false;      
    kineval.params.persist_ik = false;      
    kineval.params.trial_ik_random = {};
    kineval.params.trial_ik_random.execute = false;
    kineval.params.trial_ik_random.start = 0;
    kineval.params.trial_ik_random.time = 0.00001;
    kineval.params.trial_ik_random.targets = 0;
    kineval.params.trial_ik_random.distance_current = 0.00001;


    // initialize the active joint for user control
    kineval.params.active_link = robot.base;
    //kineval.params.active_joint = robot.links[kineval.params.active_link].children[0];

    if (typeof robot.links[kineval.params.active_link].children === 'undefined')
        kineval.params.active_joint = Object.keys(robot.joints)[0]
    else
        kineval.params.active_joint = robot.links[kineval.params.active_link].children[0];

    // initialize pose setpoints and target setpoint
    kineval.setpoints = [];
    kineval.params.setpoint_target = {};
    for (var i=0;i<10;i++) {  // 10 is the number of slots for pose setpoints
        kineval.setpoints[i] = {};
        for (x in robot.joints) {
            kineval.params.setpoint_target[x] = 0;  // current setpoint target
            kineval.setpoints[i][x] = 0;  // slot i setpoint
        }
    }

    kineval.params.dance_pose_index = 0;
    kineval.params.dance_sequence_index = [0,1,2,3,4,5,6,7,8,9];
    if (robot.name === 'fetch') {  // fetch easter egg
        kineval.params.dance_sequence_index = [1,2,1,2,1,0,3,0,3,0];
        kineval.setpoints = 
            [{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0.04,"l_gripper_finger_joint":0.04,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0.4,"shoulder_pan_joint":1.6056,"shoulder_lift_joint":-0.7112110832854187,"upperarm_roll_joint":-0.5224344562407175,"elbow_flex_joint":-0.2596467353995974,"forearm_roll_joint":0.027744058428229964,"wrist_flex_joint":-0.011999677661943124,"wrist_roll_joint":0.00012972717196553372,"gripper_axis":0.0001297271719655264,"head_pan_joint":0.00005720356139027753,"head_tilt_joint":0.00005283131465981046,"torso_fixed_joint":0.00012972717196555266,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0,"l_gripper_finger_joint":0,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0.4,"shoulder_pan_joint":0.34460326176810346,"shoulder_lift_joint":0.9958007666048422,"upperarm_roll_joint":-1.3788601366395654,"elbow_flex_joint":0.8938364230947411,"forearm_roll_joint":-0.10797832064349865,"wrist_flex_joint":0.6820807432085109,"wrist_roll_joint":0.0001297271719655064,"gripper_axis":0.00012972717196552277,"head_pan_joint":0.00005720356139027753,"head_tilt_joint":0.00005283131465981046,"torso_fixed_joint":0.00012972717196555266,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0.04,"l_gripper_finger_joint":0.04,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0.4,"shoulder_pan_joint":0.0004677854383942246,"shoulder_lift_joint":-1.221,"upperarm_roll_joint":-0.00037940857494373875,"elbow_flex_joint":0.00024155542149740568,"forearm_roll_joint":0.00001232914385335755,"wrist_flex_joint":0.00040145426866142973,"wrist_roll_joint":4.319780384106989e-8,"gripper_axis":4.319780384107232e-8,"head_pan_joint":1.904819311566239e-8,"head_tilt_joint":1.759228026605762e-8,"torso_fixed_joint":4.319780384108353e-8,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0,"l_gripper_finger_joint":0,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0.04,"l_gripper_finger_joint":0.04,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0,"l_gripper_finger_joint":0,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0.04,"l_gripper_finger_joint":0.04,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0,"l_gripper_finger_joint":0,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0.04,"l_gripper_finger_joint":0.04,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0},{"torso_lift_joint":0,"shoulder_pan_joint":0,"shoulder_lift_joint":0,"upperarm_roll_joint":0,"elbow_flex_joint":0,"forearm_roll_joint":0,"wrist_flex_joint":0,"wrist_roll_joint":0,"gripper_axis":0,"head_pan_joint":0,"head_tilt_joint":0,"torso_fixed_joint":0,"r_wheel_joint":0,"l_wheel_joint":0,"r_gripper_finger_joint":0,"l_gripper_finger_joint":0,"bellows_joint":0,"bellows_joint2":0,"estop_joint":0,"laser_joint":0}];
    }

    // initialize inverse kinematics target location 
    // KE 3 : ik_target param is redundant as an argument into inverseKinematics 
    kineval.params.ik_target = {};
    kineval.params.ik_target.position = [[0],[0.8],[1.0],[1]];
    kineval.params.ik_target.orientation = [Math.PI/6, Math.PI/4, 0];
    kineval.params.ik_orientation_included = false;
    kineval.params.ik_steplength = 0.1;
    kineval.params.ik_pseudoinverse = false;

    // initialize flags for executing planner
    kineval.params.generating_motion_plan = false; // monitor specifying state of motion plan generation
    kineval.params.update_motion_plan = false; // sets request to generate motion plan 
    kineval.motion_plan = [];
    kineval.motion_plan_traversal_index = 0;
    kineval.params.update_motion_plan_traversal = false; // sets automatic traversal of previously generated motion plan
    kineval.params.persist_motion_plan_traversal = false; // sets automatic traversal of previously generated motion plan
    kineval.params.planner_state = "not invoked";

    // toggle display of robot links, joints, and axes 
    kineval.params.display_links = true; 
    kineval.params.display_links_axes = false; 
    kineval.params.display_base_axes = false; 
    kineval.params.display_joints = false; 
    kineval.params.display_joints_axes = false; 
    kineval.params.display_collision_bboxes = false;
    kineval.params.display_wireframe = false;
    kineval.params.display_joints_active = true; 
    kineval.params.display_joints_active_axes = true; 

    // apply environment floor with map texture-mapped onto ground plane
    kineval.params.map_filename = url_params.map_filename;
    if (typeof kineval.params.map_filename === 'undefined') kineval.params.display_map = false;
    else kineval.params.display_map = true;


}

kineval.initScene = function initScene() {

    // instantiate threejs scene graph
    scene = new THREE.Scene();

    // instantiate threejs camera and set its position in the world
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );

    // KE 2 : make camera offset from robot vary with interaction, not constant 
    camera.position.y = 1;
    camera.position.z = 4;

    var light1 = new THREE.PointLight( 0xffffff, 0.3, 1000 ); 
    light1.position.set( 50, 50, 50 ); 
    scene.add( light1 );

    var light2 = new THREE.PointLight( 0xffffff, 0.3, 1000 ); 
    light2.position.set( 50, 50, -50 ); 
    scene.add( light2 );

    var light3 = new THREE.PointLight( 0xffffff, 0.3, 1000 ); 
    light3.position.set( -50, 50, -50 ); 
    scene.add( light3 );

    var light4 = new THREE.PointLight( 0xffffff, 0.3, 1000 ); 
    light4.position.set( -50, 50, 50 ); 
    scene.add( light4 );

    // instantiate threejs renderer and its dimensions
    // THREE r62 renderer = new THREE.WebGLRenderer();
    //renderer = new THREE.WebGLRenderer({antialias: true});
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor(0x00234c,1); // blue
    renderer.setClearColor(0xffc90b,1); // maize
    renderer.setClearColor(0xffffff,1); // white
    renderer.setClearColor(0x888888,1); // gray
    renderer.setSize( window.innerWidth, window.innerHeight );

    // attach threejs renderer to DOM
    document.body.appendChild( renderer.domElement );

    // instantiate threejs camera controls
    camera_controls = new THREE.OrbitControls( camera );
    camera_controls.addEventListener( 'change', renderer );

    // create world floor
    // KE T creates error : "TypeError: n.x is undefined" 
    // THREE r62 var mapMaterial = new THREE.MeshBasicMaterial( { map: kineval.params.map_texture, transparent: true, opacity: 0.2 } ); 
    var mapMaterial = new THREE.MeshBasicMaterial( { color: 0x00234c , transparent: true, opacity: 0.5 } ); 
    var mapGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    map = new THREE.Mesh(mapGeometry, mapMaterial);
    map.doubleSided = true;
    //map.receiveShadow = true; // KE T: recheck to make sure this works
    map.rotateOnAxis({x:1,y:0,z:0},-Math.PI/2),
    scene.add(map);


    // create grid on floor
    // (73) gridHelper = new THREE.GridHelper( 50, 5, 0xffc90b, 0x00234c);
    // (73) gridHelper.setColors(0xffc90b,0x00234c);
    gridHelper = new THREE.GridHelper( 100, 20, 0xffc90b, 0x00234c);
    gridHelper.translateOnAxis(new THREE.Vector3(0,1,0),0.02);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add( gridHelper );

/* experimental scene
    var light_drake = new THREE.PointLight( 0xb05890, 0.4, 10, 0.1 ); 
    light_drake.position.set( 0, 4, -5 ); 
    //scene.add( light_drake );

    var light_drake2 = new THREE.PointLight( 0xb05890, 0.5, 10, 0.1 ); 
    light_drake2.position.set( 2, 3, 0 ); 
    //scene.add( light_drake2 );

    //light_drake3 = new THREE.AmbientLight(0x301322); 
    light_drake3 = new THREE.AmbientLight(0x602845); 
    scene.add( light_drake3 );

    var geometry = new THREE.PlaneGeometry( 8, 20, 32 );
    var material = new THREE.MeshLambertMaterial( {color: 0xb05890, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateOnAxis({x:0,y:0,z:1},-Math.PI*1.2/2);//+Math.PI),
    plane.rotateOnAxis({x:1,y:0,z:0},-Math.PI/2),
    plane.position.set(-3,0,0);
    plane.material.transparent = false;
    plane.material.opacity = 1;
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.rotateOnAxis({x:0,y:0,z:1},-Math.PI*1.2/2),
    plane.rotateOnAxis({x:1,y:0,z:0},-Math.PI/2),
    plane.position.set(3,0,0);
    plane.material.transparent = false;
    plane.material.opacity = 1;
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    plane.rotateOnAxis({x:1,y:0,z:0},-Math.PI/2),
    plane.position.set(0,0.1,0);
    plane.material.transparent = false;
    plane.material.opacity = 1;
    scene.add( plane );

    plane = new THREE.Mesh( geometry, material );
    material = new THREE.MeshPhongMaterial( {color: 0xff8db0, side: THREE.DoubleSide} );
    plane.rotateOnAxis({x:0,y:0,z:1},Math.PI/2),
    plane.position.set(0,0,-11);
    plane.material.transparent = false;
    plane.material.opacity = 1;
    scene.add( plane );

    var geometry = new THREE.PlaneGeometry( 800, 800, 800 );
    material = new THREE.MeshPhongMaterial( {color: 0x8070cf, side: THREE.DoubleSide} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.set(0,0,-19);
    plane.material.transparent = false;
    plane.material.opacity = 1;
    scene.add( plane );

    var light_drake4 = new THREE.PointLight( 0xfffff, 1, 30, 0.1 ); 
    light_drake4.position.set( 0, 2, -13 ); 
    scene.add( light_drake4 );
experimental scene */



    // create geometry for endeffector and Cartesian target indicators
    var temp_geom = new THREE.CubeGeometry(0.3, 0.3, 0.3);
    var temp_material = new THREE.MeshBasicMaterial( {color: 0x0088ff} )
    endeffector_geom = new THREE.Mesh(temp_geom, temp_material); // comment this for coolness
    scene.add(endeffector_geom);
    endeffector_geom.visible = false;
    temp_geom = new THREE.CubeGeometry(0.3, 0.3, 0.3);
    temp_material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
    target_geom = new THREE.Mesh(temp_geom, temp_material); // comment this for coolness
    scene.add(target_geom);
    target_geom.visible = false;

    // create threejs geometries for robot links
    kineval.initRobotLinksGeoms();

    // create threejs geometries for robot joints
    kineval.initRobotJointsGeoms();

    // create threejs geometries for robot planning scene
    kineval.initWorldPlanningScene();

    // KE T: move this out
    //tempPointCloud(); 
    //tempGeometryLoading();
}

kineval.initGUIDisplay = function initGUIDisplay () {

    var gui = new dat.GUI();

    dummy_display = {};
    dummy_display['kineval'] = function() {kineval.displayHelp};
    gui.add(dummy_display, 'kineval');

    gui.add(kineval.params, 'just_starting').listen();

    gui_url = gui.addFolder('User Parameters');
    gui_url.add(url_params, 'robot');
    gui_url.add(url_params, 'world');
    //gui_url.add(url_params, 'map_filename');
    //gui_world = gui.addFolder('World');

    gui_robot = gui.addFolder('Robot');
    gui_robot.add(robot, 'name');
    gui_robot.add(robot, 'base');
    gui_robot.add(kineval.params, 'active_joint').listen();

    gui_fk = gui.addFolder('Forward Kinematics');
    gui_fk.add(kineval.params, 'persist_pd').listen();
    gui_fk.add(kineval.params, 'update_pd_clock').listen();
    gui_fk.add(kineval.params, 'update_pd_dance').listen();
    // KE 2 : gui dat not configured for arrays
    //gui_fk.addFolder("Base Pose")
    //gui_fk.add(robot.origin.xyz, '[0]');
    for (x in robot.joints) {
        gui_fk.addFolder(x).add(robot.joints[x], 'angle').step(0.01).listen();
    }

    gui_ik = gui.addFolder('Inverse Kinematics');
    gui_ik.add(kineval.params, 'persist_ik').listen();
    gui_ik.add(kineval.params, 'ik_steplength', 0, 1).listen();
    gui_ik.add(kineval.params, 'ik_pseudoinverse').listen();
    gui_ik.add(kineval.params, 'ik_orientation_included').listen();
    // KE 2 : gui dat not configured for arrays
    // gui_ik.add(kineval.params.ik_target, '[0]').listen();

    gui_trial = gui_ik.addFolder('IK Random Trial');
    gui_trial.add(kineval.params.trial_ik_random, 'execute').listen();
    gui_trial.add(kineval.params.trial_ik_random, 'time').listen();
    gui_trial.add(kineval.params.trial_ik_random, 'targets').listen();
    gui_trial.add(kineval.params.trial_ik_random, 'distance_current').listen();

    gui_plan = gui.addFolder('Motion Planning');
    var dummy_planning_object = {};
    dummy_planning_object.start_planner = function() {kineval.params.update_motion_plan = true; console.log("start planning")};
    gui_plan.add(dummy_planning_object, 'start_planner');
    gui_plan.add(kineval.params, 'planner_state').listen();
    gui_plan.add(kineval.params, 'persist_motion_plan_traversal');

    gui_display = gui.addFolder('Display');

    gui_axes = gui_display.addFolder('Geometries and Axes');
    gui_axes.add(kineval.params, 'display_links');
    gui_axes.add(kineval.params, 'display_links_axes');
    gui_axes.add(kineval.params, 'display_base_axes');
    gui_axes.add(kineval.params, 'display_joints');
    gui_axes.add(kineval.params, 'display_joints_axes');
    gui_axes.add(kineval.params, 'display_joints_active');
    gui_axes.add(kineval.params, 'display_joints_active_axes');
    gui_axes.add(kineval.params, 'display_wireframe');
    gui_axes.add(kineval.params, 'display_collision_bboxes');
    //gui_axes.add(kineval.params, 'display_map');

    gui_colors = gui_display.addFolder('Colors');
/*
    gui_background_color = gui_colors.addFolder('Background');
    // KE 2 : determine how to set background clear color
    gui_background_color.add(map.material.color, 'r',0,1);
    gui_background_color.add(map.material.color, 'g',0,1);
    gui_background_color.add(map.material.color, 'b',0,1);
*/
    gui_ground_color = gui_colors.addFolder('Ground');
    gui_ground_color.add(map.material.color, 'r',0,1);
    gui_ground_color.add(map.material.color, 'g',0,1);
    gui_ground_color.add(map.material.color, 'b',0,1);
    gui_link_color = gui_colors.addFolder('Links');
    // KE 2 : color range will not increment by step if value initialized to zero
    // KE 2 : put materials and geoms in proper kineval object
    gui_link_color.add(robot_material.color, 'r',0,1).step(0.01).listen();
    gui_link_color.add(robot_material.color, 'g',0,1).step(0.01).listen();
    gui_link_color.add(robot_material.color, 'b',0,1).step(0.01).listen();
    gui_joint_color = gui_colors.addFolder('Joints');
    // KE 2 : color range will not increment by step if value initialized to zero
    gui_joint_color.add(joint_material.color, 'r',0,1).step(0.01).listen();
    gui_joint_color.add(joint_material.color, 'g',0,1).step(0.01).listen();
    gui_joint_color.add(joint_material.color, 'b',0,1).step(0.01).listen();


}


kineval.initRobotLinksGeoms = function initRobotLinksGeoms() {

    // KE T: initialize this variable properly 
    robot.collision = false; 

        // KE 2 : put robot_material into correct object (fixed below?)
        // KE ! : this may need to be moved back into link for loop
        robot_material = new THREE.MeshLambertMaterial( { color: 0x00234c, transparent: true, opacity: 0.9 } );
        //robot_material = new THREE.MeshLambertMaterial( { color: 0x00234c, transparent: true, opacity: 0.9, wireframe: true } );

    // create a threejs mesh for link of the robot and add it to scene 
    for (x in robot.links) {


        // create threejs mesh for link
        // handle conversion to ROS coordinate convention
        // KE 2 : create global color constants
        if (typeof robot.links_geom_imported === "undefined")
            robot.links[x].geom = new THREE.Mesh( links_geom[x], robot_material);
        else if (!robot.links_geom_imported)
            robot.links[x].geom = new THREE.Mesh( links_geom[x], robot_material);
        else
            robot.links[x].geom = links_geom[x];
        robot.links[x].geom.name = "robot_link_"+x;

        // add to threejs mesh to scene in world frame
        // KE : defer this add until child nodes are added to the geom
        //scene.add(robot.links[x].geom);

        // remove any transform from the threejs geometry for bbox calculation
        robot.links[x].geom.setRotationFromQuaternion(new THREE.Quaternion(0,0,0,1));

        // For collision detection,
        // set the bounding box of robot link in local link coordinates
        robot.links[x].bbox = new THREE.Box3;
        //(THREE r62) robot.links[x].bbox = robot.links[x].bbox.setFromPoints(robot.links[x].geom.geometry.vertices);
        // setFromObject returns world space bbox
        robot.links[x].bbox = robot.links[x].bbox.setFromObject(robot.links[x].geom);
        // setFromPoints returns local space bbox, but no child traversal
        //robot.links[x].bbox = robot.links[x].bbox.setFromPoints(robot.links[x].geom.geometry.vertices);

        /* (73) (does not consider origin offset)
        bbox_geom = new THREE.BoxGeometry(
            robot.links[x].bbox.max.x-robot.links[x].bbox.min.x,
            robot.links[x].bbox.max.y-robot.links[x].bbox.min.y,
            robot.links[x].bbox.max.z-robot.links[x].bbox.min.z
        );
        */
       
        // (92) need to add bbox geometry directly
        var bbox_geom = new THREE.Geometry();
        bbox_geom.vertices = []; // for some reason, the allocation above populates the vertices array of the geometry with the dimensions of a bbox
        bbox_geom.vertices.push(
            new THREE.Vector3(robot.links[x].bbox.min.x,robot.links[x].bbox.min.y,robot.links[x].bbox.min.z),
            new THREE.Vector3(robot.links[x].bbox.min.x,robot.links[x].bbox.min.y,robot.links[x].bbox.max.z),
            new THREE.Vector3(robot.links[x].bbox.min.x,robot.links[x].bbox.max.y,robot.links[x].bbox.min.z),
            new THREE.Vector3(robot.links[x].bbox.min.x,robot.links[x].bbox.max.y,robot.links[x].bbox.max.z),
            new THREE.Vector3(robot.links[x].bbox.max.x,robot.links[x].bbox.min.y,robot.links[x].bbox.min.z),
            new THREE.Vector3(robot.links[x].bbox.max.x,robot.links[x].bbox.min.y,robot.links[x].bbox.max.z),
            new THREE.Vector3(robot.links[x].bbox.max.x,robot.links[x].bbox.max.y,robot.links[x].bbox.min.z),
            new THREE.Vector3(robot.links[x].bbox.max.x,robot.links[x].bbox.max.y,robot.links[x].bbox.max.z)
        );

        bbox_geom.faces.push(
            new THREE.Face3(0,1,2),
            new THREE.Face3(1,3,2),
            new THREE.Face3(4,5,6),
            new THREE.Face3(5,7,6),
            new THREE.Face3(1,5,7),
            new THREE.Face3(1,7,6),
            new THREE.Face3(2,3,7),
            new THREE.Face3(2,7,6),
            new THREE.Face3(0,4,6),
            new THREE.Face3(0,6,2),
            new THREE.Face3(0,1,4),
            new THREE.Face3(1,3,4)
        );

     
        bbox_material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe:true, visible:true } );

        // KE 2 : move bbox_mesh to proper place within link object
        robot.links[x].bbox_mesh = new THREE.Mesh(bbox_geom,bbox_material);
        robot.links[x].geom.add(robot.links[x].bbox_mesh);

        // xyz axis indicators
        axis_geom_x = new THREE.Geometry();
        axis_geom_x.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(1,0,0)
        );
        robot.links[x].axis_geom_x = new THREE.Line(axis_geom_x,
            new THREE.LineBasicMaterial({color: 0xFF0000}));
        robot.links[x].geom.add(robot.links[x].axis_geom_x);

        axis_geom_y = new THREE.Geometry();
        axis_geom_y.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,1,0)
        );
        robot.links[x].axis_geom_y = new THREE.Line(axis_geom_y,
            new THREE.LineBasicMaterial({color: 0x00FF00}));
        robot.links[x].geom.add(robot.links[x].axis_geom_y);

        axis_geom_z = new THREE.Geometry();
        axis_geom_z.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,1)
        );
        robot.links[x].axis_geom_z = new THREE.Line(axis_geom_z,
            new THREE.LineBasicMaterial({color: 0x0000FF}));
        robot.links[x].geom.add(robot.links[x].axis_geom_z);

        // add to threejs mesh to scene in world frame
        scene.add(robot.links[x].geom);
    }

}



kineval.initRobotJointsGeoms = function initRobotJointsGeoms() {
    // build kinematic hierarchy by looping over each joint in the robot
    //   (object fields can be index through array-style indices, object[field] = property)
    //   and insert threejs scene graph (each joint and link are directly connect to scene root)
    // NOTE: kinematic hierarchy is maintained independently by this code, not threejs
    // NOTE: simpleApplyMatrix can be used to set threejs transform for a rendered object

    var x,tempmat;
       
    // create threejs geometry for joint origin 
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    invisible_geom = new THREE.CubeGeometry( 0.01, 0.01, 0.01 );

    // create threejs geometry for joint
    temp_material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    joints_geom = new THREE.CubeGeometry( 0.01, 0.01, 0.01 );

    // KE 2 : create global color constants
    // KE 2 : fix lighting, use ambient until fixed
    joint_material = new THREE.MeshBasicMaterial( {color: 0xffc90b} );
    //joint_material = new THREE.MeshLambertMaterial( {color: 0xffc90b} );
    //joint_material = new THREE.MeshLambertMaterial( {color: 0xff0000} );

    for (x in robot.joints) {

        // create threejs meshes for joints
        robot.joints[x].origin.geom = new THREE.Mesh( invisible_geom, material );
        robot.joints[x].geom = new THREE.Mesh( joints_geom, temp_material );


        // Note: kinematics are maintained independently from threejs scene graph
        // add joint geometry to threejs scene graph, added SG node transforms cylinder geometry
        // handle conversion to ROS coordinate convention
        if (typeof robot.links_geom_imported === "undefined")
           var joint_geom = new THREE.CylinderGeometry( 0.2, 0.2, 0.2, 20, 3, false );  // cylinder axis aligns with along y-axis in object space
            //var joint_geom = new THREE.CylinderGeometry( 0.12, 0.12, 0.02, 20, 3, false );  // cylinder axis aligns with along y-axis in object space
        else if (robot.links_geom_imported)
            var joint_geom = new THREE.CylinderGeometry( 0.12, 0.12, 0.02, 20, 3, false );  // cylinder axis aligns with along y-axis in object space
        else
           var joint_geom = new THREE.CylinderGeometry( 0.2, 0.2, 0.2, 20, 3, false );  // cylinder axis aligns with along y-axis in object space

        robot.joints[x].display_geom = new THREE.Mesh(joint_geom, joint_material); 

        // STENCIL: update vector_normalize for joint cylinder placement
        // if joint axis not aligned with y-axis, rotate 3js cylinder axis to align with y
        if (typeof vector_cross !== 'undefined')
        if (!((robot.joints[x].axis[0] == 0) && (robot.joints[x].axis[2] == 0))) {
            var tempaxis = vector_normalize(vector_cross(robot.joints[x].axis,[0,-1,0]));
            //var tempaxis = vector_cross(robot.joints[x].axis,[0,-1,0]);
            var temp3axis = new THREE.Vector3(tempaxis[0],tempaxis[1],tempaxis[2]);
            // baked in dot product given cylinder axis is normal along y-axis
            var tempangle = Math.acos(robot.joints[x].axis[1]);
            robot.joints[x].display_geom.rotateOnAxis(temp3axis,tempangle);
        }
        scene.add(robot.joints[x].geom);
        robot.joints[x].geom.add(robot.joints[x].display_geom);

        // KE 3 : vary axis size
        axis_geom_x = new THREE.Geometry();
        axis_geom_x.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(1,0,0)
        );
        robot.joints[x].axis_geom_x = new THREE.Line(axis_geom_x,
            new THREE.LineBasicMaterial({color: 0xFF0000}));
        robot.joints[x].geom.add(robot.joints[x].axis_geom_x);

        axis_geom_y = new THREE.Geometry();
        axis_geom_y.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,1,0)
        );
        robot.joints[x].axis_geom_y = new THREE.Line(axis_geom_y,
            new THREE.LineBasicMaterial({color: 0x00FF00}));
        robot.joints[x].geom.add(robot.joints[x].axis_geom_y);

        axis_geom_z = new THREE.Geometry();
        axis_geom_z.vertices.push(
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(0,0,1)
        );
        robot.joints[x].axis_geom_z = new THREE.Line(axis_geom_z,
            new THREE.LineBasicMaterial({color: 0x0000FF}));
        robot.joints[x].geom.add(robot.joints[x].axis_geom_z);


    }
}

kineval.initWorldPlanningScene = function initWorldPlanningScene() {
    // currently just sets rendering geometries
    // world defined by robot_boundary and robot_obstacles objects in separate js include

    // set rendering geometries of world boundary
    temp_material = new THREE.MeshLambertMaterial( { color: 0xaf8c73, transparent: true, opacity: 0.6} );
    //temp_material = new THREE.MeshLambertMaterial( { color: 0xaf8c73, transparent: true, opacity: 0.6, wireframe: true} );

    temp_geom = new THREE.CubeGeometry(robot_boundary[1][0]-robot_boundary[0][0],0.2,0.2);
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = (robot_boundary[1][0]+robot_boundary[0][0])/2;
    temp_mesh.position.y = 0;
    temp_mesh.position.z = robot_boundary[0][2];
    scene.add(temp_mesh);

    temp_geom = new THREE.CubeGeometry(robot_boundary[1][0]-robot_boundary[0][0],0.2,0.2);
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = (robot_boundary[1][0]+robot_boundary[0][0])/2;
    temp_mesh.position.y = 0;
    temp_mesh.position.z = robot_boundary[1][2];
    scene.add(temp_mesh);

    temp_geom = new THREE.CubeGeometry(0.2,0.2,robot_boundary[1][2]-robot_boundary[0][2]);
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = robot_boundary[0][0];
    temp_mesh.position.y = 0;
    temp_mesh.position.z = (robot_boundary[1][2]+robot_boundary[0][2])/2;
    scene.add(temp_mesh);

    temp_geom = new THREE.CubeGeometry(0.2,0.2,robot_boundary[1][2]-robot_boundary[0][2]);
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = robot_boundary[1][0];
    temp_mesh.position.y = 0;
    temp_mesh.position.z = (robot_boundary[1][2]+robot_boundary[0][2])/2;
    scene.add(temp_mesh);
 
    // set rendering geometries of world obstacles
    var i;
    for (i=0;i<robot_obstacles.length;i++) { 
        temp_geom = new THREE.SphereGeometry(robot_obstacles[i].radius);
        temp_material = new THREE.MeshLambertMaterial( { color: 0xaf8c73, transparent: true, opacity: 0.6 } );
        //temp_material = new THREE.MeshLambertMaterial( { color: 0xaf8c73, transparent: true, opacity: 0.6 , wireframe: true} );
        temp_mesh = new THREE.Mesh(temp_geom, temp_material);
        temp_mesh.position.x = robot_obstacles[i].location[0][0];
        temp_mesh.position.y = robot_obstacles[i].location[1][0];
        temp_mesh.position.z = robot_obstacles[i].location[2][0];
        scene.add(temp_mesh);
    }
}

//////////////////////////////////////////////////
/////     CONTROLLER INTERFACE FUNCTIONS
//////////////////////////////////////////////////

kineval.setPoseSetpoint = function set_pose_setpoint (pose_id) {
    if (pose_id < 1)
        textbar.innerHTML = "setpoint is preset zero pose";
    else
        textbar.innerHTML = "setpoint is user defined pose "+pose_id;
    kineval.params.setpoint_id = pose_id;
    for (x in robot.joints) {
        kineval.params.setpoint_target[x] = kineval.setpoints[pose_id][x];
    }
}

kineval.assignPoseSetpoint = function assign_pose_setpoint (pose_id) {
    if ((pose_id < 1)||(pose_id>9))
        console.warn("kineval: setpoint id must be between 1 and 9 inclusive");
    else
        textbar.innerHTML = "assigning current pose to setpoint "+pose_id;
    for (x in robot.joints) {
        kineval.setpoints[pose_id][x] = robot.joints[x].angle;
    }
}

//////////////////////////////////////////////////
/////     FILE LOADING FUNCTIONS
//////////////////////////////////////////////////

kineval.loadJSFile = function loadJSFile(filename,kineval_object) { 

// load JavaScript file dynamically from filename, and (optionally) assign to recognized field of kineval object
// WARNING: execution of the kineval main loop must wait until the specified file is loaded.  For the browser, this is accomplished by having kineval.start() called within the window.onload() function of the executing HTML document

    // create HTML script element and set its type and source file
    robotDefinitionElement = document.createElement('script');
    robotDefinitionElement.setAttribute("type","text/javascript");
    robotDefinitionElement.setAttribute("src",filename);

    // assuming this element is created, append it to the head of the referring HTML document
    if (typeof robotDefinitionElement !== 'undefined') {
        document.getElementsByTagName("head")[0].appendChild(robotDefinitionElement);
        kineval[kineval_object+"_file"] = filename;
    }
    else
    {
        console.warn("kineval: "+filename+" not loaded");
    }

    if (kineval_object!=="robot" && kineval_object!=="world" && kineval_object!=="floor")
        console.warn("kineval: JS file loaded, object type "+kineval_object+" not recognized");

}

function tempPointCloud() {

    // KE T: create point cloud
    var i;
    pcloud_geom = [];
    pcloud_material = [];
    for (i=0;i<pointcloud_meta.width;i++) {
        pcloud_geom[i] = new THREE.Geometry();
        // draw point cloud all black
        var colortmp = 0x000000;

        // stripe columns with color
        if (i%40 < 20) {
            //colortmp = 0xFF0000; // red
            // fade columns from red to blue
            colortmp = Math.pow(2,16)*Math.round((255*(pointcloud_meta.width-i)/pointcloud_meta.width))+0x0000FF*(i/pointcloud_meta.width);
        }

        /* THREE r62
        pcloud_material[i] = new THREE.ParticleBasicMaterial({
            color: colortmp,
            size: 0.020
        }); 
        */
        pcloud_material[i] = new THREE.PointsMaterial({ color: colortmp, size: 0.020 }); 
    }

    //pcloud_geom.vertices = pointcloud;
    var angle = 2.6*Math.PI/4;
    var mean = [0,0,0,0];
    //for (i=0;i<pointcloud.length;i+=10) {
    for (i=0;i<pointcloud.length;i++) {
        pointcloud[i][0] = Number(pointcloud[i][0]);
        pointcloud[i][1] = Number(pointcloud[i][1]);
        pointcloud[i][2] = Number(pointcloud[i][2]);
        mean[0] += pointcloud[i][0]/(pointcloud.length/1);
        mean[1] += pointcloud[i][1]/(pointcloud.length/1);
        mean[2] += pointcloud[i][2]/(pointcloud.length/1);
    }

    //for (i=0;i<pointcloud.length;i+=10) {
    for (i=0;i<pointcloud.length;i++) {
        if (0==1) { // apply transform 
        particletmp = new THREE.Vector3(
            pointcloud[i][0]-mean[0],
            pointcloud[i][1]-mean[1],
            pointcloud[i][2]-mean[2]);
        particle = new THREE.Vector3(
            1*particletmp.x+0*particletmp.y+0*particletmp.z+2,
            0*particletmp.x+Math.cos(angle)*particletmp.y+-1*Math.sin(angle)*particletmp.z+0.5,
            0*particletmp.x+Math.sin(angle)*particletmp.y+Math.cos(angle)*particletmp.z+0
            );
        } 
        particle = new THREE.Vector3(
            pointcloud[i][0],
            pointcloud[i][1],
            pointcloud[i][2]);
        //if (pointcloud_meta.idxmap[i]%pointcloud_meta.width == 200)
        //pcloud_geom.vertices.push(particle);
        pcloud_geom[pointcloud_meta.idxmap[i]%pointcloud_meta.width].vertices.push(particle);
    }

    //pcloud = new THREE.ParticleSystem(pcloud_geom,pcloud_material);
    //scene.add(pcloud);

    for (i=0;i<pointcloud_meta.width;i++) {
        // THREE r62 pcloud = new THREE.ParticleSystem(pcloud_geom[i],pcloud_material[i]);
        pcloud = new THREE.Points(pcloud_geom[i],pcloud_material[i]);
        scene.add(pcloud);
    }


/* normal computation
    chosenidx = 40000;
  for (chosenidx=40000;chosenidx<40500;chosenidx+=20) { 
  //for (chosenidx=500;chosenidx<pointcloud.length;chosenidx+=20000) { 
  //for (chosenidx=40000;chosenidx<41100;chosenidx+=1000) { 
    pcloud_point_centered = [];
    pcloud_point_weights = [];
    pcloud_point_weighted = [];
    var sum_weight = 0;
    for (i=0;i<pointcloud.length;i++) {
        pcloud_point_centered[i] = [];
        pcloud_point_centered[i][0] = pointcloud[i][0]-pointcloud[chosenidx][0];
        pcloud_point_centered[i][1] = pointcloud[i][1]-pointcloud[chosenidx][1];
        pcloud_point_centered[i][2] = pointcloud[i][2]-pointcloud[chosenidx][2];
        //pcloud_point_weights[i] = Math.exp(-numeric.dot(pointcloud[chosenidx],pointcloud[i])/Math.pow(0.2,2));
        pcloud_point_weights[i] = Math.exp(-Math.pow(numeric.norm2(numeric.sub(pointcloud[chosenidx],pointcloud[i])),2)/Math.pow(1.8,2));
        sum_weight += pcloud_point_weights[i];
        // perform numeric.dot(numeric.diag(pcloud_point_weighted),pointcloud)
        pcloud_point_weighted[i] = [];
        pcloud_point_weighted[i][0] = pcloud_point_weights[i]*pcloud_point_centered[i][0];
        pcloud_point_weighted[i][1] = pcloud_point_weights[i]*pcloud_point_centered[i][1];
        pcloud_point_weighted[i][2] = pcloud_point_weights[i]*pcloud_point_centered[i][2];
    }
    console.log(chosenidx+" "+sum_weight); 
    pcloud_point_centered_transpose = numeric.transpose(pcloud_point_centered);
    //cov = numeric.div(numeric.dot(pcloud_point_centered_transpose,numeric.dot(numeric.diag(pcloud_point_weighted),pointcloud))/(pointcloud.length-1));
    cov = numeric.div(numeric.dot(pcloud_point_centered_transpose,pcloud_point_weighted),pointcloud.length-1);
    eigs = numeric.eig(cov);

    var material = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });
    var material2 = new THREE.LineBasicMaterial({
        color: 0x00ffff
    });

    for (i=2;i<3;i++) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
	    new THREE.Vector3( pointcloud[chosenidx][0], pointcloud[chosenidx][1], pointcloud[chosenidx][2] ),
	    new THREE.Vector3( pointcloud[chosenidx][0]+0.1*eigs.E.x[i][0], pointcloud[chosenidx][1]+0.1*eigs.E.x[i][1], pointcloud[chosenidx][2]+0.1*eigs.E.x[i][2] )
        );

        if (i == 2)
        var line = new THREE.Line( geometry, material );
        else
        line = new THREE.Line( geometry, material2 );

        scene.add( line );
    }
  } // chosenidx
*/  // normal computation
}


