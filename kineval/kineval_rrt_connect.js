
/*-- |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/|

    KinEval | Kinematic Evaluator | RRT motion planning

    Implementation of robot kinematics, control, decision making, and dynamics 
        in HTML5/JavaScript and threejs
     
    @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Creative Commons 3.0 BY-SA

|\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| |\/| --*/

//////////////////////////////////////////////////
/////     RRT MOTION PLANNER
//////////////////////////////////////////////////

// STUDENT: 
// compute motion plan and output into robot_path array 
// elements of robot_path are vertices based on tree structure in tree_init() 
// motion planner assumes collision checking by kineval.poseIsCollision()

/* KE 2 : Notes:
   - Distance computation needs to consider modulo for joint angles
   - robot_path[] should be used as desireds for controls
   - Add visualization of configuration for current sample
   - Add cubic spline interpolation
   - Add hook for random configuration
   - Display planning iteration number in UI
*/

/*
STUDENT: reference code has functions for:

*/

kineval.planMotionRRTConnect = function motionPlanningRRTConnect() {

    // exit function if RRT is not implemented
    //   start by uncommenting kineval.robotRRTPlannerInit 
    if (typeof kineval.robotRRTPlannerInit === 'undefined') return;

    if ((kineval.params.update_motion_plan) && (!kineval.params.generating_motion_plan)) {
        kineval.robotRRTPlannerInit();
        kineval.params.generating_motion_plan = true;
        kineval.params.update_motion_plan = false;
        kineval.params.planner_state = "initializing";
    }
    if (kineval.params.generating_motion_plan) {
        rrt_result = robot_rrt_planner_iterate();
        if (rrt_result === "reached") {
            kineval.params.update_motion_plan = false; // KE T needed due to slight timing issue
            kineval.params.generating_motion_plan = false;
            textbar.innerHTML = "planner execution complete";
            kineval.params.planner_state = "complete";
        }
        else kineval.params.planner_state = "searching";
    }
    else if (kineval.params.update_motion_plan_traversal||kineval.params.persist_motion_plan_traversal) {

        if (kineval.params.persist_motion_plan_traversal) {
            kineval.motion_plan_traversal_index = (kineval.motion_plan_traversal_index+1)%kineval.motion_plan.length;
            textbar.innerHTML = "traversing planned motion trajectory";
        }
        else
            kineval.params.update_motion_plan_traversal = false;

        // set robot pose from entry in planned robot path
        robot.origin.xyz = [
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[0],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[1],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[2]
        ];

        robot.origin.rpy = [
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[3],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[4],
            kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[5]
        ];

        // KE 2 : need to move q_names into a global parameter
        for (x in robot.joints) {
            robot.joints[x].angle = kineval.motion_plan[kineval.motion_plan_traversal_index].vertex[q_names[x]];
        }

    }
}


    // STENCIL: uncomment and complete initialization function
kineval.robotRRTPlannerInit = function robot_rrt_planner_init() {

    // form configuration from base location and joint angles
    q_start_config = [
        robot.origin.xyz[0],
        robot.origin.xyz[1],
        robot.origin.xyz[2],
        robot.origin.rpy[0],
        robot.origin.rpy[1],
        robot.origin.rpy[2]
    ];

    q_names = {};  // store mapping between joint names and q DOFs
    q_index = [];  // store mapping between joint names and q DOFs

    for (x in robot.joints) {
        q_names[x] = q_start_config.length;
        q_index[q_start_config.length] = x;
        q_start_config = q_start_config.concat(robot.joints[x].angle);
    }

    // set goal configuration as the zero configuration
    var i; 
    q_goal_config = new Array(q_start_config.length);
    for (i=0;i<q_goal_config.length;i++) q_goal_config[i] = 0;

    // flag to continue rrt iterations
    rrt_iterate = true;
    rrt_iter_count = 0;

    // make sure the rrt iterations are not running faster than animation update
    cur_time = Date.now();
}



function robot_rrt_planner_iterate() {

    var i;
    rrt_alg = 1;  // 0: basic rrt (OPTIONAL), 1: rrt_connect (REQUIRED)

    if (rrt_iterate && (Date.now()-cur_time > 10)) {
        cur_time = Date.now();

    // STENCIL: implement single rrt iteration here. an asynch timing mechanism 
    //   is used instead of a for loop to avoid blocking and non-responsiveness 
    //   in the browser.
    //
    //   once plan is found, highlight vertices of found path by:
    //     tree.vertices[i].vertex[j].geom.material.color = {r:1,g:0,b:0};
    //
    //   provided support functions:
    //
    //   kineval.poseIsCollision - returns if a configuration is in collision
    //   tree_init - creates a tree of configurations
    //   tree_add_vertex - adds and displays new configuration vertex for a tree
    //   tree_add_edge - adds and displays new tree edge between configurations
    }

}

//////////////////////////////////////////////////
/////     STENCIL SUPPORT FUNCTIONS
//////////////////////////////////////////////////

function tree_init(q) {

    // create tree object
    var tree = {};

    // initialize with vertex for given configuration
    tree.vertices = [];
    tree.vertices[0] = {};
    tree.vertices[0].vertex = q;
    tree.vertices[0].edges = [];

    // create rendering geometry for base location of vertex configuration
    add_config_origin_indicator_geom(tree.vertices[0]);

    // maintain index of newest vertex added to tree
    tree.newest = 0;

    return tree;
}

function tree_add_vertex(tree,q) {


    // create new vertex object for tree with given configuration and no edges
    var new_vertex = {};
    new_vertex.edges = [];
    new_vertex.vertex = q;

    // create rendering geometry for base location of vertex configuration
    add_config_origin_indicator_geom(new_vertex);

    // maintain index of newest vertex added to tree
    tree.vertices.push(new_vertex);
    tree.newest = tree.vertices.length - 1;
}

function add_config_origin_indicator_geom(vertex) {

    // create a threejs rendering geometry for the base location of a configuration
    // assumes base origin location for configuration is first 3 elements 
    // assumes vertex is from tree and includes vertex field with configuration

    temp_geom = new THREE.CubeGeometry(0.1,0.1,0.1);
    temp_material = new THREE.MeshLambertMaterial( { color: 0xffff00, transparent: true, opacity: 0.7 } );
    temp_mesh = new THREE.Mesh(temp_geom, temp_material);
    temp_mesh.position.x = vertex.vertex[0];
    temp_mesh.position.y = vertex.vertex[1];
    temp_mesh.position.z = vertex.vertex[2];
    scene.add(temp_mesh);
    vertex.geom = temp_mesh;
}


function tree_add_edge(tree,q1_idx,q2_idx) {

    // add edge to first vertex as pointer to second vertex
    tree.vertices[q1_idx].edges.push(tree.vertices[q2_idx]);

    // add edge to second vertex as pointer to first vertex
    tree.vertices[q2_idx].edges.push(tree.vertices[q1_idx]);

    // can draw edge here, but not doing so to save rendering computation
}

//////////////////////////////////////////////////
/////     RRT IMPLEMENTATION FUNCTIONS
//////////////////////////////////////////////////


    // STENCIL: implement RRT-Connect functions here, such as:
    //   rrt_extend
    //   rrt_connect
    //   random_config
    //   new_config
    //   nearest_neighbor
    //   normalize_joint_state
    //   find_path
    //   path_dfs










