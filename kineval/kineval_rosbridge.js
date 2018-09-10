
kineval.initrosbridge = function init_rosbridge() {

// KE 2 : add this to kineval object
ros = new ROSLIB.Ros({
    //url : 'ws://192.168.1.152:9090'
    //url : 'ws://fetch7:9090'
    url : 'ws://fetch7.lan:9090'
    //url : 'ws://fetch18.lan:9090'
    //url : 'ws://fetch18.lan:9092'
    //url : 'ws://fetch7.lan:9092'
    //url : 'ws://192.168.1.118:9090'
}); 

ros.on('connection', function() {
    console.log('kineval: roslib: connect to websocket server.');
});

ros.on('error', function(error) {
    console.log('kineval: roslib: error connecting to websocket server', error);
});

ros.on('close', function() {
    console.log('kineval: roslib: connection to websocket server closed.');
});

//KE : add this to kineval object
listener = new ROSLIB.Topic({
    ros : ros,
    name : '/joint_states_throttle',
    //name : '/joint_states',
    messageType : 'sensor_msgs/JointState'
}); 
    // run topic throttling on ros backend
    // rosrun topic_tools throttle messages joint_states 2
    //name : '/joint_states',

listener.subscribe(function(message) {
    textbar.innerHTML = 'joint angles: '+'<br>';
    for (var i=0;i<message.name.length;i++) {
        if (typeof robot.joints[message.name[i]] !== 'undefined')
            robot.joints[message.name[i]].angle = message.position[i];
            //console.log('kineval: roslib: set '+message.name[i]+' to '+message.position[i]);
            textbar.innerHTML += message.name[i]+' to '+message.position[i]+'<br>';
    }
    //console.log('kineval: roslib: new message at '+message.header.stamp.secs+'.'+message.header.stamp.nsecs);
    textbar.innerHTML += message.header.stamp.secs+'.'+message.header.stamp.nsecs;
});

rosManip = new ROSLIB.Topic({
   ros : ros,
   name : '/fetch_grasp',
   messageType : 'fetch_manipulation_pipeline/fetchGrasp'
});


// KE clean up topic formatting
rosManipGrasp = new ROSLIB.Message({
    "normal":[{"x":0.3, "y": 0.5, "z":0.6}],
    "principalAxis":[{"x": 0.6, "y": 0.7, "z": 0.8}],
    "point":[{"x": 0.9, "y": 1.0, "z": 1.1}],
    "objnum":[{"data":1}] 
});

//  "msg": { "normal":[{"x":0.3, "y": 0.5, "z":0.6}],"principalAxis":[{"x": 0.6, "y": 0.7, "z": 0.8}],"point":[{"x": 0.9, "y": 1.0, "z": 1.1}],"objnum":[{"data":1}]}

rosCmdVel = new ROSLIB.Topic({
   ros : ros,
   name : '/cmd_vel',
   messageType : 'geometry_msgs/Twist'
});

rosTwistFwd = new ROSLIB.Message({
    linear : {
        x : 1.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    }
});

rosTwistBwd = new ROSLIB.Message({
    linear : {
        x : -1.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    }
});

rosTwistRht = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : -1.0
    }
});

rosTwistLft = new ROSLIB.Message({
    linear : {
        x : 0.0,
        y : 0.0,
        z : 0.0
    },
    angular : {
        x : 0.0,
        y : 0.0,
        z : 1.0
    }
});




}

