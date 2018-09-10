
/*
     Fetch robot URDF kinematic description in JavaScript
     
     @author ohseejay / https://github.com/ohseejay / https://bitbucket.org/ohseejay

     based on description and Collada models provided by Fetch Robotics: 

         https://github.com/fetchrobotics/fetch_ros/blob/indigo-devel/fetch_description/robots/fetch.urdf

*/


robot = {
  name:"fetch", 
  base:"base_link", 
  origin:{ xyz: [0,0.1,0], rpy:[0,0,0] },
  links: {
    "base_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "base_link_adjusted.dae" } }
      }
    },
    "r_wheel_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "l_wheel_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "l_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "torso_lift_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "torso_lift_link_adjusted.dae" } }
      }
    },
    "head_pan_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "head_pan_link_adjusted.dae" } }
      }
    },
    "head_tilt_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "head_tilt_link_adjusted.dae" } }
      }
    },
    "shoulder_pan_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "shoulder_pan_link_adjusted.dae" } }
      }
    },
    "shoulder_lift_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "shoulder_lift_link_adjusted.dae" } }
      }
    },
    "upperarm_roll_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "upperarm_roll_link_adjusted.dae" } }
      }
    },
    "elbow_flex_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "elbow_flex_link_adjusted.dae" } }
      }
    },
    "forearm_roll_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "forearm_roll_link_adjusted.dae" } }
      }
    },
    "wrist_flex_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "wrist_flex_link_adjusted.dae" } }
      }
    },
    "wrist_roll_link": {
      visual : { 
        origin: { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "wrist_roll_link_adjusted.dae" } }
      }
    },
    "gripper_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "gripper_link_adjusted.dae" } }
      }
    },
    "r_gripper_finger_link": {
      visual : { 
        origin : { xyz: [0,0.101425,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_gripper_finger_link.STL" } },
        material : { color : { rgba : [0.356, 0.361, 0.376, 1] } }
      }
    },
    "l_gripper_finger_link": {
      visual : { 
        origin : { xyz: [0,-0.101425,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "l_gripper_finger_link.STL" } },
        material : { color : { rgba : [0.356, 0.361, 0.376, 1] } }
      }
    },
    "bellows_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "bellows_link.STL" } },
        material : { color : { rgba : [0, 0, 0, 1] } }
      }
    },
    "bellows_link2": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "bellows_link.STL" } },
        material : { color : { rgba : [0, 0, 0, 1] } }
      }
    },
    "estop_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "estop_link.STL" } },
        material : { color : { rgba : [0.8, 0, 0, 1] } }
      }
    },
    "laser_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "laser_link.STL" } },
        material : { color : {
            rgba : [0.792156862745098, 0.819607843137255, 0.933333333333333, 1]
          }
        }
      }
    },
    "torso_fixed_link": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "torso_fixed_link_adjusted.dae" } }
      }
    },
  },
};

// specify name of endeffector frame
robot.endeffector = {};
robot.endeffector.frame = "gripper_axis";
robot.endeffector.position = [ [0.1],[0],[0],[1] ]

robot.joints = {};

robot.joints.torso_lift_joint = {parent:"base_link", child:"torso_lift_link"};
robot.joints.torso_lift_joint.axis = [0,0,1];
robot.joints.torso_lift_joint.type = "prismatic";
robot.joints.torso_lift_joint.origin = {xyz: [-0.086875,0,0.37743], rpy:[-6.123E-17,0,0]};
robot.joints.torso_lift_joint.limit = {lower:0, upper:0.4};

robot.joints.r_wheel_joint = {parent:"base_link", child:"r_wheel_link"};
robot.joints.r_wheel_joint.axis = [0,1,0];
robot.joints.r_wheel_joint.type = "continuous";
robot.joints.r_wheel_joint.origin = {xyz: [0.0012914,-0.18738,0.055325], rpy:[-6.123E-17,0,0]};

robot.joints.l_wheel_joint = {parent:"base_link", child:"l_wheel_link"};
robot.joints.l_wheel_joint.axis = [0,1,0];
robot.joints.l_wheel_joint.type = "continuous";
robot.joints.l_wheel_joint.origin = {xyz: [0.0012914,0.18738,0.055325], rpy:[-6.123E-17,0,0]};


robot.joints.shoulder_pan_joint = {parent:"torso_lift_link", child:"shoulder_pan_link"};
robot.joints.shoulder_pan_joint.axis = [0,0,1];
robot.joints.shoulder_pan_joint.type = "revolute";
robot.joints.shoulder_pan_joint.origin = {xyz: [0.119525,0,0.34858], rpy:[0,0,0]};
robot.joints.shoulder_pan_joint.limit = {lower:-1.6056, upper:1.6056};

robot.joints.shoulder_lift_joint = {parent:"shoulder_pan_link", child:"shoulder_lift_link"};
robot.joints.shoulder_lift_joint.axis = [0,1,0];
robot.joints.shoulder_lift_joint.type = "revolute";
robot.joints.shoulder_lift_joint.origin = {xyz: [0.117,0,0.0599999999999999], rpy:[0,0,0]};
robot.joints.shoulder_lift_joint.limit = {lower:-1.221, upper:1.518};

robot.joints.upperarm_roll_joint = {parent:"shoulder_lift_link", child:"upperarm_roll_link"};
robot.joints.upperarm_roll_joint.axis = [1,0,0];
robot.joints.upperarm_roll_joint.type = "continuous";
robot.joints.upperarm_roll_joint.origin = {xyz: [0.219,0,0], rpy:[0,0,0]};

robot.joints.elbow_flex_joint = {parent:"upperarm_roll_link", child:"elbow_flex_link"};
robot.joints.elbow_flex_joint.axis = [0,1,0];
robot.joints.elbow_flex_joint.type = "revolute";
robot.joints.elbow_flex_joint.origin = {xyz: [0.133,0,0], rpy:[0,0,0]};
robot.joints.elbow_flex_joint.limit = {lower:-2.251, upper:2.251};

robot.joints.forearm_roll_joint = {parent:"elbow_flex_link", child:"forearm_roll_link"};
robot.joints.forearm_roll_joint.axis = [1,0,0];
robot.joints.forearm_roll_joint.type = "continuous";
robot.joints.forearm_roll_joint.origin = {xyz: [0.197,0,0], rpy:[0,0,0]};

robot.joints.wrist_flex_joint = {parent:"forearm_roll_link", child:"wrist_flex_link"};
robot.joints.wrist_flex_joint.axis = [0,1,0];
robot.joints.wrist_flex_joint.type = "revolute";
robot.joints.wrist_flex_joint.origin = {xyz: [0.1245,0,0], rpy:[0,0,0]};
robot.joints.wrist_flex_joint.limit = {lower:-2.16, upper:2.16};

robot.joints.wrist_roll_joint = {parent:"wrist_flex_link", child:"wrist_roll_link"};
robot.joints.wrist_roll_joint.axis = [1,0,0];
robot.joints.wrist_roll_joint.type = "continuous";
robot.joints.wrist_roll_joint.origin = {xyz: [0.1385,0,0], rpy:[0,0,0]};

robot.joints.gripper_axis = {parent:"wrist_roll_link", child:"gripper_link"};
//robot.joints.gripper_axis.axis = [0,1,0]; // in urdf but does not seem correct
robot.joints.gripper_axis.axis = [1,0,0]; // in urdf but does not seem correct
robot.joints.gripper_axis.type = "fixed";
robot.joints.gripper_axis.origin = {xyz: [0.16645,0,0], rpy:[0,0,0]};

robot.joints.head_pan_joint = {parent:"torso_lift_link", child:"head_pan_link"};
robot.joints.head_pan_joint.axis = [0,0,1];
robot.joints.head_pan_joint.type = "revolute";
robot.joints.head_pan_joint.origin = {xyz: [0.053125,0,0.603001417713939], rpy:[0,0,0]};
robot.joints.head_pan_joint.limit = {lower:-1.57, upper:1.57};

robot.joints.head_tilt_joint = {parent:"head_pan_link", child:"head_tilt_link"};
robot.joints.head_tilt_joint.axis = [0,1,0];
robot.joints.head_tilt_joint.type = "revolute";
robot.joints.head_tilt_joint.origin = {xyz: [0.14253,0,0.057999], rpy:[0,0,0]};
robot.joints.head_tilt_joint.limit = {lower:-0.76, upper:1.45};

robot.joints.r_gripper_finger_joint = {parent:"gripper_link", child:"r_gripper_finger_link"};
robot.joints.r_gripper_finger_joint.axis = [0,1,0];
robot.joints.r_gripper_finger_joint.type = "prismatic";
robot.joints.r_gripper_finger_joint.origin = {xyz: [0,0.015425,0], rpy:[0,0,0]};
robot.joints.r_gripper_finger_joint.limit = {lower:0.0, upper:0.05};

robot.joints.l_gripper_finger_joint = {parent:"gripper_link", child:"l_gripper_finger_link"};
robot.joints.l_gripper_finger_joint.axis = [0,-1,0];
robot.joints.l_gripper_finger_joint.type = "prismatic";
robot.joints.l_gripper_finger_joint.origin = {xyz: [0,-0.015425,0], rpy:[0,0,0]};
robot.joints.l_gripper_finger_joint.limit = {lower:0.0, upper:0.05};

robot.joints.bellows_joint = {parent:"torso_lift_link", child:"bellows_link"};
robot.joints.bellows_joint.axis = [0,0,-1];
robot.joints.bellows_joint.type = "prismatic";
robot.joints.bellows_joint.origin = {xyz: [0,0,0], rpy:[0,0,0]};
robot.joints.bellows_joint.limit = {lower:0.0, upper:0.4};

robot.joints.bellows_joint2 = {parent:"torso_lift_link", child:"bellows_link2"};
robot.joints.bellows_joint2.axis = [0,0,1]; 
robot.joints.bellows_joint2.type = "fixed";
robot.joints.bellows_joint2.origin = {xyz: [0,0,0], rpy:[0,0,0]};

robot.joints.estop_joint = {parent:"base_link", child:"estop_link"};
robot.joints.estop_joint.axis = [0,0,0]; // is fetch.urdf zero axis correct?
robot.joints.estop_joint.type = "fixed";
robot.joints.estop_joint.origin = {xyz: [-0.12465,0.23892,0.31127], rpy:[1.5708,0,0]};

robot.joints.laser_joint = {parent:"base_link", child:"laser_link"};
robot.joints.laser_joint.axis = [0,0,0];
robot.joints.laser_joint.type = "fixed";
robot.joints.laser_joint.origin = {xyz: [0.235,0,0.2878], rpy:[3.14159265359,0,0]};

robot.joints.torso_fixed_joint = {parent:"base_link", child:"torso_fixed_link"};
robot.joints.torso_fixed_joint.axis = [0,1,0];
robot.joints.torso_fixed_joint.type = "fixed";
robot.joints.torso_fixed_joint.origin = {xyz: [-0.086875,0,0.377425], rpy:[-6.12303176911189E-17,0,0]};

/*
// filenames for link collada models
// delme for ColladaLoader 1        'base_link_delme.dae',
// without delme for ColladaLoader 2       'base_link.dae',
    fetch_dae_files = [
        'base_link_adjusted.dae',
        'elbow_flex_link_adjusted.dae',
        'forearm_roll_link_adjusted.dae',
        'gripper_link_adjusted.dae',
        'head_pan_link_adjusted.dae',
        'head_tilt_link_adjusted.dae',
        'shoulder_lift_link_adjusted.dae',
        'shoulder_pan_link_adjusted.dae',
        'torso_fixed_link_adjusted.dae',
        'torso_lift_link_adjusted.dae',
        'upperarm_roll_link_adjusted.dae',
        'wrist_flex_link_adjusted.dae',
        'wrist_roll_link_adjusted.dae'
     ];
*/


// note ROS coordinate system (x:forward, y:lateral, z:up) is different than threejs (x:lateral, y:up, z:forward)
robot.links_geom_imported = true;

links_geom = {};

  // KE: replace hardcoded robot directory
  // KE: replace file extension processing
progressLinkLoading = 0;
i = 0;
imax = Object.keys(robot.links).length;
for (x in robot.links) {
  //geom_index = robot.links[x].visual.geometry.mesh.filename.split('_adjusted')[0];
  //geom_extension = robot.links[x].visual.geometry.mesh.filename.split('_adjusted')[1];
  filename_split = robot.links[x].visual.geometry.mesh.filename.split('.');
  geom_index = filename_split[0];
  geom_extension = filename_split[filename_split.length-1];
  console.log(geom_index + "  " + geom_extension);
  //assignFetchModel('./robots/fetch/'+robot.links[x].visual.geometry.mesh.filename,geom_index);
  if (geom_extension === "dae") { // KE: extend to use regex
    assignFetchModelCollada('./robots/fetch/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else if (geom_extension === "DAE") { // extend to use regex
    assignFetchModelCollada('./robots/fetch/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else {
    assignFetchModelSTL('./robots/fetch/'+robot.links[x].visual.geometry.mesh.filename,robot.links[x].visual.material,x);
  }
  i++;

  progressLinkLoading = i/imax; 
  console.log("Robot geometry: progressLinkLoading " + progressLinkLoading*100);
}

function assignFetchModelCollada(filename,index) {

    console.log("assignFetchModel : "+filename+" - "+index); 
    var collada_loader = new THREE.ColladaLoader();
    var val = collada_loader.load(filename, 
       function ( collada ) {
            links_geom[index] = collada.scene;
        },
        function (xhr) {
            console.log(filename+" - "+index+": "+(xhr.loaded / xhr.total * 100) + '% loaded' );
        }
    );
}

function assignFetchModelCollada2(filename,index) {

    console.log("assignFetchModel : "+filename+" - "+index); 
    var collada_loader = new ColladaLoader2();
    var val = collada_loader.load(filename, 
       function ( collada ) {
            links_geom[index] = collada.scene;
        },
        function (xhr) {
            console.log(filename+" - "+index+": "+(xhr.loaded / xhr.total * 100) + '% loaded' );
        }
    );
}


function assignFetchModelSTL(filename,material_urdf,linkname) {

    console.log("assignFetchModel : "+filename+" - "+linkname); 
    var stl_loader = new THREE.STLLoader();
    var val = stl_loader.load(filename, 
       function ( geometry ) {
            // ocj: add transparency
            var material_color = new THREE.Color(material_urdf.color.rgba[0], material_urdf.color.rgba[1], material_urdf.color.rgba[2]);
            var material = new THREE.MeshLambertMaterial( {color: material_color, side: THREE.DoubleSide} );
            links_geom[linkname] = new THREE.Mesh( geometry, material ) ;
        } //,
        //function (xhr) {
        //    console.log(filename+" - "+linkname+": "+(xhr.loaded / xhr.total * 100) + '% loaded' );
        //}
    );
}


