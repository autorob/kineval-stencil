/*|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\

    2D Path Planning in HTML5 Canvas | Javascript Infrastructure Methods

    Javascript support functions for the Canvas planning environment.
      Students SHOULD NOT EDIT this file but may want to reference it when editing
      graph_search.js or rrt.js. Includes:

      Student helpers: Functions that students may use by calling them in
                       graph_search.js or rrt.js.
      Environment support functions: Functions that set up the environment and
                                     handle coordinate conversion
      Initialization functions: Functions that set up the planner and
                                environment data structures.

    @author ohseejay / https://github.com/ohseejay
                     / https://bitbucket.org/ohseejay

    Chad Jenkins
    Laboratory for Perception RObotics and Grounded REasoning Systems
    University of Michigan

    License: Michigan Honor License

    Usage: see search_canvas.html

|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/*/

//////////////////////////////////////////////////
/////     STUDENT HELPERS
//////////////////////////////////////////////////

function testCollision(q) {

    var j;

    // test for collision with each object
    for (j=0;j<range.length;j++) {

        // assume configuration is in collision
        var in_collision = true;

        // no collision detected, if configuration is outside obstacle along any dimension
        for (i=0;i<q.length;i++) {
            if ((q[i]<range[j][i][0])||(q[i]>range[j][i][1]))
                in_collision = false;
        }

        // return collision, if configuration inside obstacle extents along all dimensions
        if (in_collision)
            return true;
    }

    // return no collision, if no collision detected with any obstacle
    return false;
}

function initRRT(q) {

    // create tree object
    var tree = {};

    // initialize with vertex for given configuration
    tree.vertices = [];
    tree.vertices[0] = {};
    tree.vertices[0].vertex = q;
    tree.vertices[0].edges = [];

    // maintain index of newest vertex added to tree
    tree.newest = 0;

    return tree;
}

function insertTreeVertex(tree,q) {

    // create new vertex object for tree with given configuration and no edges
    new_vertex = {};
    new_vertex.edges = [];
    new_vertex.vertex = q;
    tree.vertices.push(new_vertex);

    // maintain index of newest vertex added to tree
    tree.newest = tree.vertices.length - 1;

    // draw location on canvas
    draw_2D_configuration(q, "visited");
}


function insertTreeEdge(tree,q1_idx,q2_idx) {

    // add edge to first vertex as pointer to second vertex
    tree.vertices[q1_idx].edges.push(tree.vertices[q2_idx]);

    // add edge to second vertex as pointer to first vertex
    tree.vertices[q2_idx].edges.push(tree.vertices[q1_idx]);

    // draw edge on canvas
    draw_2D_edge_configurations(tree.vertices[q1_idx].vertex,tree.vertices[q2_idx].vertex);
}

//////////////////////////////////////////////////
/////     ENVIRONMENT SUPPORT FUNCTIONS
//////////////////////////////////////////////////

// functions for transforming canvas coordinates into planning world coordinates
// Note: world to view functions translate a world coordinate into a CANVAS
//       coordinate while mouse to world functions translate a mouse coordinate
//       (relative to the PAGE, not the canvas) into a world coordinate

function xformWorldViewX(world_x) {
    return (world_x*100)+200;  // view_x
}
function xformWorldViewY(world_y) {
    return (world_y*100)+200;  // view_y
}
function xformMouseWorldX(view_x) {
    return (view_x-canvas_side_off-200)/100;  // world_x
}
function xformMouseWorldY(view_y) {
    return (view_y-canvas_top_off-200)/100;  // world_y
}

function setPlanningScene() {

    // obstacles specified as a range along [0] (x-dimension) and [1] y-dimension
    range = []; // global variable

    // world boundary
    range[0] = [ [-1.8,5.8],[-1.8,-1] ];
    range[1] = [ [-1.8,5.8],[5,5.8] ];
    range[2] = [ [-1.8,-1], [-1.8,5.8] ];
    range[3] = [ [5,5.8],   [-1.8,5.8] ];

    if (typeof planning_scene === 'undefined')
        planning_scene = 'empty';

    if (planning_scene == 'misc') {
        /*  misc stuff with narrow opening */
        range[4] = [ [1,2],[1,2] ];
        range[5] = [ [3,3.3],[1,4] ];
        range[6] = [ [0.6,0.7],[0.4,0.7] ];
        range[7] = [ [3.7,3.9],[-0.8,5] ];
    }
    else if (planning_scene == 'narrow1') {
        /*  narrow path 1 */
        range[4] = [ [1,3],[4,5] ];
        range[5] = [ [1,3],[-1,2] ];
        range[6] = [ [1,1.95],[2,3.8] ];
    }
    else if (planning_scene == 'narrow2') {
        /*  narrow path 2 */
        range[4] = [ [1,3],[4,5] ];
        range[5] = [ [1,3],[-1,2] ];
        range[6] = [ [1,1.9],[2,3.8] ];
        range[7] = [ [2.1,3],[2.2,4] ];
    }
    else if (planning_scene == 'three_sections') {
        /*  three compartments */
        range[4] = [ [1,1.3],[4,5] ];
        range[5] = [ [1,1.3],[-1,3.5] ];
        range[6] = [ [2.7,3],[-1,0] ];
        range[7] = [ [2.7,3],[.5,5] ];
    }
}

//////////////////////////////////////////////////
/////     INITIALIZATION FUNCTIONS
//////////////////////////////////////////////////

function init() {
    // store the location of the canvas relative to the webpage
    var b_rect = document.getElementById("myCanvas").getBoundingClientRect();
    canvas_side_off = b_rect.left;
    canvas_top_off = b_rect.top;

    // initialize search variables, data structures, DOM elements, etc.
    initSearch();

    // start main animation/iteration loop
    animate();
}

function initSearch() {

    // specify default search algorithm to use for planning
    //search_alg = "depth-first";
    //search_alg = "breadth-first";
    //search_alg = "greedy-best-first";
    search_alg = "A-star";
    //search_alg = "RRT";
    //search_alg = "RRT-connect";
    //search_alg = "RRT-star";

    // specify default the world for the planner
    //  (stored as "range" global variable with name "planning_scene")
    //planning_scene = "empty";
    planning_scene = "misc";
    //planning_scene = "narrow1";
    //planning_scene = "narrow2";
    //planning_scene = "three_sections";

    // specify default eps (epsilon) spatial resolution variable
    //   for RRT, specifies threshold radius for step size and reaching goal
    eps = 0.1;

    // create event handlers for the mouse
    canvas = document.getElementById("myCanvas");
    mouse_x = 0;
    mouse_y = 0;

    // when the mouse moves, update the mouse's location
    canvas.onmousemove = function handleMouseMove(event) {
        mouse_x = event.clientX;
        mouse_y = event.clientY;
    };

    // when the mouse button is pressed, update mouseDown
    canvas.onmousedown = function() {
        mouseDown = 1;
    };

    // when the mouse button is released, update mouseDown
    canvas.onmouseup = function() {
        mouseDown = 0;
        q_goal = [xformMouseWorldX(mouse_x),xformMouseWorldY(mouse_y)];
        restartSearch();
    };

    // specify start and goal configurations
    q_start_config = [0,0];
    q_goal_config = [4,4];
    q_init = q_start_config;
    q_goal = q_goal_config;

    // keep track of the last goal drawn on the canvas
    prev_q_goal = [10000,1000];

    color_scheme = "default";

    var url_parsed = window.location.href.split("?");
    for (i=1;i<url_parsed.length;i++) {
        var param_parsed = url_parsed[i].split("=");
        //eval(param_parsed[0]+"=\'"+param_parsed[1]+"\'");
        if ((param_parsed[0] !== "search_alg")&&(param_parsed[0] !== "planning_scene")&&(param_parsed[0] !== "color_scheme"))
            eval(param_parsed[0]+"="+param_parsed[1]);
        else
            eval(param_parsed[0]+"=\'"+param_parsed[1]+"\'");
    }


    // set up the color constants
    initColorScheme(color_scheme);

    // set the world for the planner \
    setPlanningScene();

    // initialize search tree from start configurations (RRT-based algorithms)
    T_a = initRRT(q_init);
    // also initialize search tree from goal configuration (RRT-Connect)
    T_b = initRRT(q_goal);

    // initialize graph search algorithms (DFS, BFS, A-star)
    initSearchGraph();

    // flag to continue or stop search iterations
    search_iterate = true;

    // counter for number of search iterations executed
    search_iter_count = 0;
    search_result = "starting";

    // threshold for number of maximum search iterations for certain algorithms
    search_max_iterations = 10000;

    // counter for number of configurations visited
    search_visited = 0;

    // variable to sum final path length
    path_length = 0;

    // don't draw the path until asked to
    draw_path = false;

    // capture the current system time for timing of successive iterations
    //   using the given Date object
    cur_time = Date.now();

    // specify minimum number of milliseconds between successive search
    //   iterations
    min_msec_between_iterations = 20;

    // create textbar DOM element for text output to browser window
    textbar = document.createElement('div');
    textbar.style.zIndex = 0;    // if you still don't see the label, try uncommenting this
    textbar.style.position = 'absolute';
    textbar.style.width = window.width-10;
    textbar.style["font-family"] = "Monospace";
    textbar.style["font-size"] = "12px";
    textbar.style.height = 20;
    if (color_scheme == "light") {
        textbar.style.color = "#FFFFFF";
    } else {
        textbar.style.color = "#000000";
    }
    textbar.innerHTML = "Search Canvas";
    //textbar.style.top = 30 + 'px';  // position textbar wrt. document
    textbar.style.top = (23 + document.getElementById("myCanvas").offsetTop) + 'px';  // position textbar wrt. canvas
    textbar.style.left = (25 + document.getElementById("myCanvas").offsetLeft) + 'px';  // position textbar wrt. canvas
    document.body.appendChild(textbar);

}

// reset counters and the search data structure without re-initializing the whole
// canvas environment (for use when the goal is changed via mouse press)
function restartSearch() {

    // turn search iteration back on if it was off
    search_iterate = true;

    // back to iteration zero
    search_iter_count = 0;

    // no results yet
    search_result = "starting";

    // reset the count of visited states
    search_visited = 0;

    // no path found yet
    path_length = 0;

    // re-initialize the queue
    initSearchGraph();

    // or the RRTs
    T_a = initRRT(q_init);
    T_b = initRRT(q_goal);

    // don't draw the path until asked to
    draw_path = false;
}
