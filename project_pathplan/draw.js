/*|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\
|\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/|
||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/
/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\/||\

    2D Path Planning in HTML5 Canvas | Javascript Drawing Methods

    Methods for drawing on the canvas and handling the animation loop for the
      HTML5 canvas planning environment. Students SHOULD NOT EDIT this file but
      may want to reference it when editing graph_search.js or rrt.js.
      Includes:

      Student helpers: Functions that students may use by calling them in
                       graph_search.js or rrt.js.
      Drawing helpers: Functions that handle environment drawing
      Animation and interaction loop: Functions that control the main search
                                      loop.

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

function draw_2D_configuration(q, style) {

    // draw location of 2D configuration on canvas
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    var size = 2;
    if (style == "visited") {
        // for visited states, draw a larger square
        ctx.fillStyle = visited_state;
        size = 6;
    } else if (style == "queued") {
        // for queued states, draw a smaller square
        ctx.fillStyle = queued_state;
        size = 3;
    } else {
        // otherwise draw tiny black squares
        ctx.fillStyle = "#000000";
    }
    ctx.fillRect(xformWorldViewX(q[0])-(size/2),
                 xformWorldViewY(q[1])-(size/2),
                 size, size);
}

function drawHighlightedPathGraph(current_node) {

    // once this method has been called, redraw the path until told otherwise
    if (!draw_path) {
        draw_path = true;
        path_q = current_node;
    }

    // traverse path back to start and draw path
    ctx.lineWidth=4;
    path_length = 0;
    q_path_ref = current_node;
    while (q_path_ref.distance > 0) {
        if (testCollision([q_path_ref.x, q_path_ref.y])) {
            // if node is in collision, draw it and the next line in red
            ctx.fillStyle = collision;
            ctx.strokeStyle = collision;
        } else if (testCollision([q_path_ref.parent.x, q_path_ref.parent.y])) {
            // if parent node is in collision, draw this node in blue but line in red
            ctx.fillStyle = path_start;
            ctx.strokeStyle = collision;
        } else if (path_length == 0) {
            // if this is the goal node, draw it in green
            ctx.fillStyle = goal_fill;
            // draw the line in blue if next node is valid, red if collision
            if (testCollision([q_path_ref.parent.x, q_path_ref.parent.y])) {
                ctx.strokeStyle = collision;
            } else {
                ctx.strokeStyle = path_start;
            }
        } else {
            // no collisions; draw node and line in blue
            ctx.strokeStyle = path_start;
            ctx.fillStyle = path_start;
        }
        ctx.beginPath();
        ctx.moveTo(xformWorldViewX(q_path_ref.x),xformWorldViewY(q_path_ref.y));
        ctx.lineTo(xformWorldViewX(q_path_ref.parent.x),xformWorldViewY(q_path_ref.parent.y));
        ctx.closePath();
        ctx.stroke();
        ctx.fillRect(xformWorldViewX(q_path_ref.x) - 3,
                     xformWorldViewY(q_path_ref.y) - 3,
                     6, 6);

        path_length += Math.sqrt(Math.pow(q_path_ref.x-q_path_ref.parent.x,2)+Math.pow(q_path_ref.y-q_path_ref.parent.y,2));
        q_path_ref = q_path_ref.parent;
    }


}

function draw_2D_edge_configurations(q1,q2) {
    // draw line between locations of two 2D configurations on canvas
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.strokeStyle = visited_state;
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(xformWorldViewX(q1[0]),xformWorldViewY(q1[1]));
    ctx.lineTo(xformWorldViewX(q2[0]),xformWorldViewY(q2[1]));
    ctx.stroke();
}

function drawHighlightedPath(path) {
    // once this method has been called, redraw the path until told otherwise
    if (!draw_path) {
        draw_path = true;
        rrt_path = path;
    }

    ctx = c.getContext("2d");
    ctx.lineWidth = 4;

    for (var q = 0; q < path.length; q++) {
        if (testCollision(path[q].vertex)) {
            // if node is in collision, draw it and the next line in red
            ctx.fillStyle = collision;
            ctx.strokeStyle = collision;
        } else if (q < path.length-1 && testCollision(path[q+1].vertex)) {
            // if next node is in collision, draw this node in blue but line in red
            ctx.fillStyle = path_start;
            ctx.strokeStyle = collision;
        } else if (path[q].vertex == q_goal) {
            // if this is the goal node, draw it in green
            ctx.fillStyle = goal_fill;
            // draw the line in blue if next node is valid, red if collision
            if (q < path.length-1 && testCollision(path[q+1].vertex)) {
                ctx.strokeStyle = collision;
            } else {
                ctx.strokeStyle = path_start;
            }
        } else {
            // no collisions; draw node and line in blue
            ctx.strokeStyle = path_start;
            ctx.fillStyle = path_start;
        }

        if (q < path.length-1) {
            ctx.beginPath();
            ctx.moveTo(xformWorldViewX(path[q].vertex[0]),xformWorldViewY(path[q].vertex[1]));
            ctx.lineTo(xformWorldViewX(path[q+1].vertex[0]),xformWorldViewY(path[q+1].vertex[1]));
            ctx.closePath();
            ctx.stroke();
        }

        ctx.fillRect(xformWorldViewX(path[q].vertex[0]) - 3,
                     xformWorldViewY(path[q].vertex[1]) - 3,
                     6, 6);
    }
}

//////////////////////////////////////////////////
/////     DRAWING HELPERS
//////////////////////////////////////////////////

function drawRobotWorld() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");

    // restart from a clean canvas if goal has been changed by mouse
    if (prev_q_goal != q_goal) {
        ctx.fillStyle = canvas_bg;
        ctx.fillRect(0, 0, c.width, c.height);
        prev_q_goal = q_goal;
    }

    // draw start and goal configurations
    ctx.fillStyle = path_start;
    ctx.fillRect(xformWorldViewX(q_init[0])-5,xformWorldViewY(q_init[1])-5,10,10);
    ctx.fillStyle = goal_fill;
    ctx.fillRect(xformWorldViewX(q_goal[0])-5,xformWorldViewY(q_goal[1])-5,10,10);

    // draw robot's world
    for (j=0;j<range.length;j++) {
        ctx.fillStyle = obstacle_fill;
        ctx.fillRect(xformWorldViewX(range[j][0][0]),xformWorldViewY(range[j][1][0]),xformWorldViewX(range[j][0][1])-xformWorldViewX(range[j][0][0]),xformWorldViewY(range[j][1][1])-xformWorldViewY(range[j][1][0]));
    }
}

//////////////////////////////////////////////////
/////     COLOR DEFINITIONS
//////////////////////////////////////////////////

function initColorScheme(scheme_name) {
    if (scheme_name == "light") {
        obstacle_fill = "#272A2A";
        visited_state = "#959D9D";
        queued_state = "#0AA1FF";
        path_start = "#0072BB";
        goal_fill = "#8FC93A";
        collision = "#DF2935";
        canvas_bg = "#FFFFFF";
    } else if (scheme_name == "blue") {
        obstacle_fill = "#8888FF";
        visited_state = "#8888AA";
        queued_state = "#0088FF";
        path_start = "#0000FF";
        goal_fill = "#00FF00";
        collision = "#FF0000";
        canvas_bg = "#FFFFFF";
    } else {
        obstacle_fill = "#BFC4C4";
        visited_state = "#7D8685";
        queued_state = "#FFBC42";
        path_start = "#0097F5";
        goal_fill = "#8FC93A";
        collision = "#DF2935";
        canvas_bg = "#000000";
    }
}

//////////////////////////////////////////////////
/////     ANIMATION AND INTERACTION LOOP
//////////////////////////////////////////////////

function animate() {

    // IMPORTANT:
    //   Search iterations occur asynchronously, once per call to this function.
    //   This structure does not use an explicit loop to advance the search.
    //   Such an explicit loop would keep the process inside this function
    //   without giving control back to the browser run-time.  As a result,
    //   the browser would become non-responsive and non-interactive.
    //   In this asynchronous structure, the animate function is called to
    //   first perform one iteration of the search algorithm, then register
    //   itself as an animation callback to the brower using the
    //   requestAnimationFrame() function, and finally returning out of the
    //   function (giving control back to the browser).
    //   requestAnimationFrame() sets this function to be executed
    //   again in the very near future.  Such behavior is similar to expected
    //   control flow of the setInterval function.

    // render the world to the canvas element
    drawRobotWorld();

    // make sure the rrt iterations are not running faster than animation update
    if (search_iterate && (Date.now()-cur_time > min_msec_between_iterations)) {

        // update time marker for last iteration update
        cur_time = Date.now();

        // update iteration count
        search_iter_count++;

        // call iteration for the selected search algorithm
        switch (search_alg) {
            case "depth-first":
            case "breadth-first":
            case "greedy-best-first":
            case "A-star":
                search_result = iterateGraphSearch();
                break;
            case "RRT":
                search_result = "failed";
                // (hack to speed viz)
                while (search_result == "failed")
                    search_result = iterateRRT();
                break;
            case "RRT-connect":
                // (hack to speed viz) while (search_result == "failed")
                    search_result = iterateRRTConnect();
                break;
            case "RRT-star":
                search_result = iterateRRTStar();
                break;
            default:
                console.warn('search_canvas: search algorithm not found, using rrt as default');
                search_result = iterateRRT();
                break;
        }
    }

    if (draw_path) {
        if (search_alg.includes("RRT")) {
            drawHighlightedPath(rrt_path);
        } else {
            drawHighlightedPathGraph(path_q);
        }
    }

    // update textbar with current search state
    textbar.innerHTML =
        search_alg + " progress: " + search_result
        + " <br> "
        + "start: " + q_init
        + " | "
        + "goal: " + q_goal
        + " <br> "
        + "iteration: " + search_iter_count
        + " | "
        + "visited: " + search_visited
        + " | "
        + "queue size: " + visit_queue.length
        + " <br> "
        + "path length: " + path_length.toFixed(2);
        //textbar.innerHTML += "<br> mouse ("+ mouse_x+","+mouse_y+")";
        textbar.innerHTML += "<br> mouse ("+ xformMouseWorldX(mouse_x)+","+xformMouseWorldY(mouse_y)+")";


    // callback request for the animate function be called again
    //   more details online:  http://learningwebgl.com/blog/?p=3189
    requestAnimationFrame( animate );
}

