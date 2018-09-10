
darkgray = [.2,.2,.2,1];
sawyer_red = [.5,.1,.1,1];
darkred = sawyer_red; 
sawyer_gray = [0.75294,0.75294,0.75294,1];

robot = {
  name:"sawyer", 
  base:"pedestal", 
  //base:"right_arm_base_link", 
  origin:{ xyz: [0,0.1,0], rpy:[0,0,0] },
  links: {
/*
    "base": {}, // empty link
    "torso": { // no geometry
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
          // box 0 0 0
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
          // rgba .2 .2 .2 1
      }
    },
*/
    "pedestal": {
      visual : { 
        //origin : { xyz: [0.26,0.345,-0.91488], rpy:[1.57079632679,0,-1.57079632679] },
        origin : { xyz: [0,0,0.91488], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/pedestal.DAE" } },
        geometry : { mesh : { filename : "PEDESTAL.DAE" } },
        material : { color : { rgba : darkgray } }
      }
    },
/*
    "controller_box": { //collision only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "pedestal_feet": { // collision only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
*/
    "right_arm_base_link": {
      visual : { 
        origin : { xyz: [-0.0006241, -2.8025E-05, 0.065404], rpy:[0,0,0] },
        geometry : { mesh : { filename : "base.DAE" } },
        //geometry : { mesh : { filename : "sawyer_pv/base.DAE" } },
        material : { color : { rgba : sawyer_red } }
      }
    },
    "right_l0": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_mp3/l0.DAE" } },
        geometry : { mesh : { filename : "l0.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
    "head": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/head.DAE" } },
        geometry : { mesh : { filename : "head.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
/*
    "right_torso_itb": { // inertial only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
*/
    "right_l1": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_mp3/l1.DAE" } },
        geometry : { mesh : { filename : "l1.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
    "right_l2": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/l2.DAE" } },
        geometry : { mesh : { filename : "l2.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
    "right_l3": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/l3.DAE" } },
        geometry : { mesh : { filename : "l3.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
    "right_l4": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/l4.DAE" } },
        geometry : { mesh : { filename : "l4.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
/*
    "right_arm_itb": { // inertial only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
*/
    "right_l5": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_pv/l5.DAE" } },
        geometry : { mesh : { filename : "l5.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
/*
    "right_hand_camera": { // empty link
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "right_wrist": { // empty link
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
*/
    "right_l6": {
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //geometry : { mesh : { filename : "sawyer_mp1/l6.DAE" } },
        geometry : { mesh : { filename : "l6.DAE" } },
        material : { color : { rgba : [sawyer_red] } }
      }
    },
/*
    "right_hand": { // inertial and collision only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
          // <cylinder length="0.03" radius="0.035"/>
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "right_l1_2": { // inertial and collision only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
          // <cylinder length="0.14" radius="0.07"/>
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "right_l4_2": { // inertial and collision only
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
          // <sphere radius="0.06"/>
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    },
    "screen": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
          // <box size="0.24 0.14 0.002"/>
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
          // <material name="darkgray"/>
      }
    },
    "head_camera": { // empty link 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    }
*/
  },
 
/*
    "blank": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "r_wheel_link.STL" } },
        material : { color : { rgba : [0.086, 0.506, 0.767, 1] } }
      }
    }
*/

/*
  <link name="base"/>
  <link name="torso">
  <link name="pedestal">
  <link name="controller_box">
  <link name="pedestal_feet">
  <link name="right_arm_base_link">
  <link name="right_l0">
  <link name="head">
  <link name="right_torso_itb">
  <link name="right_l1">
  <link name="right_l2">
  <link name="right_l3">
  <link name="right_l4">
  <link name="right_arm_itb">
  <link name="right_l5">
  <link name="right_hand_camera"/>
  <link name="right_wrist"/>
  <link name="right_l6">
  <link name="right_hand">
  <link name="right_l1_2">
  <link name="right_l2_2">
  <link name="right_l4_2">
  <link name="screen">
  <link name="head_camera"/>
*/

};

/*
  <joint name="controller_box_fixed" type="fixed">
  <joint name="pedestal_feet_fixed" type="fixed">
  <joint name="torso_t0" type="fixed">
  <joint name="pedestal_fixed" type="fixed">
  <joint name="right_arm_mount" type="fixed">
  <joint name="right_j0" type="revolute">
  <joint name="head_pan" type="revolute">
*/

// specify name of endeffector frame
robot.endeffector = {};
robot.endeffector.frame = "right_j6";
robot.endeffector.position = [[0.1],[0],[0],[1]]

robot.joints = {};
/*
robot.joints.torso_lift_joint = {parent:"base_link", child:"torso_lift_link"};
robot.joints.torso_lift_joint.axis = [0,0,1];
robot.joints.torso_lift_joint.type = "prismatic";
robot.joints.torso_lift_joint.origin = {xyz: [-0.086875,0,0.37743], rpy:[-6.123E-17,0,0]};
robot.joints.torso_lift_joint.limit = {lower:0, upper:0.4};
*/

// hacked origin offset for pedestal base and missing controller box
robot.joints.pedestal_fixed = {parent:"pedestal", child:"right_arm_base_link"};
robot.joints.pedestal_fixed.axis = [0,0,1];
robot.joints.pedestal_fixed.type = "fixed";
robot.joints.pedestal_fixed.origin = {xyz: [0,0,0.86488], rpy:[0,0,0]};
robot.joints.pedestal_fixed.limit = {lower:0, upper:0};

robot.joints.right_j0 = {parent:"right_arm_base_link", child:"right_l0"};
robot.joints.right_j0.axis = [0,0,1];
robot.joints.right_j0.type = "revolute";
robot.joints.right_j0.origin = {xyz: [0,0,0.08], rpy:[0,0,0]};
robot.joints.right_j0.limit = {lower:-3.0503, upper:3.0503};

robot.joints.head_pan = {parent:"right_l0", child:"head"};
robot.joints.head_pan.axis = [0,0,1];
robot.joints.head_pan.type = "revolute";
robot.joints.head_pan.origin = {xyz: [0,0,0.2965], rpy:[0,0,0]};
robot.joints.head_pan.limit = {lower:-5.0952, upper:0.9064};

robot.joints.right_j1 = {parent:"right_l0", child:"right_l1"};
robot.joints.right_j1.axis = [0,0,1];
robot.joints.right_j1.type = "revolute";
robot.joints.right_j1.origin = {xyz: [0.081,0.05,0.237], rpy:[-1.57079632679,1.57079632679,0]};
robot.joints.right_j1.limit = {lower:-3.8095, upper:2.2736};

robot.joints.right_j2 = {parent:"right_l1", child:"right_l2"};
robot.joints.right_j2.axis = [0,0,1];
robot.joints.right_j2.type = "revolute";
robot.joints.right_j2.origin = {xyz: [0,-0.14,0.1425], rpy:[1.57079632679,0,0]};
robot.joints.right_j2.limit = {lower:-3.0426, upper:3.0426};

robot.joints.right_j3 = {parent:"right_l2", child:"right_l3"};
robot.joints.right_j3.axis = [0,0,1];
robot.joints.right_j3.type = "revolute";
robot.joints.right_j3.origin = {xyz: [0,-0.042,0.26], rpy:[-1.57079632679,0,0]};
robot.joints.right_j3.limit = {lower:-3.0439, upper:3.0439};

robot.joints.right_j4 = {parent:"right_l3", child:"right_l4"};
robot.joints.right_j4.axis = [0,0,1];
robot.joints.right_j4.type = "revolute";
robot.joints.right_j4.origin = {xyz: [0,-0.125,-0.1265], rpy:[1.57079632679,0,0]};
robot.joints.right_j4.limit = {lower:-2.9761, upper:2.9761};

robot.joints.right_j5 = {parent:"right_l4", child:"right_l5"};
robot.joints.right_j5.axis = [0,0,1];
robot.joints.right_j5.type = "revolute";
robot.joints.right_j5.origin = {xyz: [0,0.031,0.275], rpy:[1.57079632679,0,0]};
robot.joints.right_j5.limit = {lower:-2.9761, upper:2.9761};

robot.joints.right_j6 = {parent:"right_l5", child:"right_l6"};
robot.joints.right_j6.axis = [0,0,1];
robot.joints.right_j6.type = "revolute";
robot.joints.right_j6.origin = {xyz: [0,-0.11,0.1053], rpy:[-1.57079632679,-0.17453,3.1416]};
robot.joints.right_j6.limit = {lower:-4.7124, upper:4.7124};


// note ROS coordinate system (x:forward, y:lateral, z:up) is different than threejs (x:lateral, y:up, z:forward)
robot.links_geom_imported = true;

links_geom = {};

  // KE: replace hardcoded robot directory
  // KE: replace file extension processing
i = 0;
for (x in robot.links) {
  //geom_index = robot.links[x].visual.geometry.mesh.filename.split('_adjusted')[0];
  //geom_extension = robot.links[x].visual.geometry.mesh.filename.split('_adjusted')[1];
  filename_split = robot.links[x].visual.geometry.mesh.filename.split('.');
  geom_index = filename_split[0];
  geom_extension = filename_split[filename_split.length-1];
  console.log(geom_index + "  " + geom_extension);
  //assignFetchModel('./robots/sawyer/'+robot.links[x].visual.geometry.mesh.filename,geom_index);
  if (geom_extension === "dae") { // extend to use regex
    assignFetchModelCollada('./robots/sawyer/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else if (geom_extension === "DAE") { // extend to use regex
    assignFetchModelCollada('./robots/sawyer/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else {
    assignFetchModelSTL('./robots/sawyer/'+robot.links[x].visual.geometry.mesh.filename,robot.links[x].visual.material,x);
  }
  i++;
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




