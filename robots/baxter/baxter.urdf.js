
darkgray = [.2,.2,.2,1];
sawyer_red = [.5,.1,.1,1];
darkred = sawyer_red; 
sawyer_gray = [0.75294,0.75294,0.75294,1];

robot = {
  name:"baxter", 
  base:"pedestal", 
  origin:{ xyz: [0,0.1,0], rpy:[0,0,0] },
  links: {
    "torso": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/torso/base_link.DAE" } },
        material : { color : { rgba : darkgray } }
      }
    },
    "pedestal": {
      visual : { 
        origin : { xyz: [0,0,0.91488], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/base/PEDESTAL.DAE" } },
        material : { color : { rgba : [darkgray] } }
      }
    },
    "head": {
      visual : { 
        origin : { xyz: [0,0,0.00953], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/head/H0.DAE" } },
        material : { color : { rgba : [darkgray] } }
      }
    },
    "screen": { 
      visual : { 
        origin : { xyz: [0,-0.00953,-0.0347], rpy:[0,-1.57079632679,0] },
        geometry : { mesh : { filename : "meshes/head/H1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_arm_mount": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //XX create box
        geometry : { mesh : { filename : "meshes/wrist/W2.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_upper_shoulder": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_shoulder/S0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_lower_shoulder": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_shoulder/S1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_upper_elbow": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_elbow/E0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_lower_elbow": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_elbow/E1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_upper_forearm": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_forearm/W0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_lower_forearm": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_forearm/W1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "right_wrist": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/wrist/W2.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },

    "left_arm_mount": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        //XX create box
        geometry : { mesh : { filename : "meshes/wrist/W2.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_upper_shoulder": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_shoulder/S0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_lower_shoulder": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_shoulder/S1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_upper_elbow": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_elbow/E0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_lower_elbow": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_elbow/E1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_upper_forearm": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/upper_forearm/W0.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_lower_forearm": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/lower_forearm/W1.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
    "left_wrist": { 
      visual : { 
        origin : { xyz: [0,0,0], rpy:[0,0,0] },
        geometry : { mesh : { filename : "meshes/wrist/W2.DAE" } },
        material : { color : { rgba : [darkred] } }
      }
    },
 
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

};


// specify name of endeffector frame
robot.endeffector = {};
robot.endeffector.frame = "right_w2";
robot.endeffector.position = [[0.1],[0],[0],[1]]

robot.joints = {};

// hacked origin offset for pedestal base
robot.joints.torso_t0 = { 
    type : "fixed",
    parent: "pedestal", child: "torso", 
    axis : [0,0,1],
    origin : {xyz: [0,0,0.86488], rpy:[0,0,0]},
    limit : {lower:-3.01, upper:3.01}
};

robot.joints.headpan = { 
    type : "revolute",
    parent: "torso", child: "head",
    axis : [0,0,1],
    origin : {xyz: [0.06,0,0.686], rpy:[0,0,0]},
    limit : {lower:-3.14, upper:3.14}
};

robot.joints.headnod = { 
    type : "fixed",
    parent: "head", child: "screen",
    axis : [0,0,1],
    origin : {xyz: [0.1227,0,0], rpy:[1.75057, 0, 1.57079632679]},
    limit : {lower:-3.14, upper:3.14}
};

//merge of head_camera and display_joint
robot.joints.display_joint = { 
    type : "fixed",
    parent: "head", child: "screen",
    axis : [0,0,1],
    //origin : {xyz: [0.12839,-0.016,0.06368], rpy:[1.75057,0,1.57079632679]},
    origin : {xyz: [0.12839,-0.016,0.06368], rpy:[Math.PI/2,0,0]},
    limit : {lower:-3.14, upper:3.14}
};

robot.joints.right_torso_arm_mount = { 
    type : "fixed",
    parent: "torso", child: "right_arm_mount",
    axis : [0,0,1],
    origin : {xyz: [0.024645,-0.219645,0.118588], rpy:[0,0,-0.7854]},
    limit : {lower:-3.14, upper:3.14}
};

robot.joints.right_s0 = { 
    type : "revolute",
    parent: "right_arm_mount", child: "right_upper_shoulder",
    axis : [0,0,1],
    origin : {xyz: [0.055695,0,0.011038], rpy:[0,0,0]},
    limit : {lower:-1.70167993878, upper:1.70167993878}
};

robot.joints.right_s1 = { 
    type : "revolute",
    parent: "right_upper_shoulder", child: "right_lower_shoulder",
    axis : [0,0,1],
    origin : {xyz: [0.069,0,0.27035], rpy:[-1.57079632679,0,0]},
    limit : {lower:-2.147, upper:1.047}
};

robot.joints.right_e0 = { 
    type : "revolute",
    parent: "right_lower_shoulder", child: "right_upper_elbow",
    axis : [0,0,1],
    origin : {xyz: [0.102,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.05417993878, upper:3.05417993878}
};

robot.joints.right_e1 = { 
    type : "revolute",
    parent: "right_upper_elbow", child: "right_lower_elbow",
    axis : [0,0,1],
    origin : {xyz: [0.069,0,0.26242], rpy:[-1.57079632679,-1.57079632679,0]},
    limit : {lower:-0.05, upper:2.618}
};

robot.joints.right_w0 = { 
    type : "revolute",
    parent: "right_lower_elbow", child: "right_upper_forearm",
    axis : [0,0,1],
    origin : {xyz: [0.10359,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.059, upper:3.059}
};

robot.joints.right_w1 = { 
    type : "revolute",
    parent: "right_upper_forearm", child: "right_lower_forearm",
    axis : [0,0,1],
    origin : {xyz: [0.01,0,0.2707], rpy:[-1.57079632679,-1.57079632679,0]},
    limit : {lower:-1.57079632679, upper:2.094}
};

robot.joints.right_w2 = { 
    type : "revolute",
    parent: "right_lower_forearm", child: "right_wrist",
    axis : [0,0,1],
    origin : {xyz: [0.115975,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.059, upper:3.059}
};

robot.joints.left_torso_arm_mount = { 
    type : "fixed",
    parent: "torso", child: "left_arm_mount",
    axis : [0,0,1],
    origin : {xyz: [0.024645,0.219645,0.118588], rpy:[0,0,0.7854]},
    limit : {lower:-3.14, upper:3.14}
};

robot.joints.left_s0 = { 
    type : "revolute",
    parent: "left_arm_mount", child: "left_upper_shoulder",
    axis : [0,0,1],
    origin : {xyz: [0.055695,0,0.011038], rpy:[0,0,0]},
    limit : {lower:-1.70167993878, upper:1.70167993878}
};

robot.joints.left_s1 = { 
    type : "revolute",
    parent: "left_upper_shoulder", child: "left_lower_shoulder",
    axis : [0,0,1],
    origin : {xyz: [0.069,0,0.27035], rpy:[-1.57079632679,0,0]},
    limit : {lower:-2.147, upper:1.047}
};

robot.joints.left_e0 = { 
    type : "revolute",
    parent: "left_lower_shoulder", child: "left_upper_elbow",
    axis : [0,0,1],
    origin : {xyz: [0.102,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.05417993878, upper:3.05417993878}
};

robot.joints.left_e1 = { 
    type : "revolute",
    parent: "left_upper_elbow", child: "left_lower_elbow",
    axis : [0,0,1],
    origin : {xyz: [0.069,0,0.26242], rpy:[-1.57079632679,-1.57079632679,0]},
    limit : {lower:-0.05, upper:2.618}
};

robot.joints.left_w0 = { 
    type : "revolute",
    parent: "left_lower_elbow", child: "left_upper_forearm",
    axis : [0,0,1],
    origin : {xyz: [0.10359,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.059, upper:3.059}
};

robot.joints.left_w1 = { 
    type : "revolute",
    parent: "left_upper_forearm", child: "left_lower_forearm",
    axis : [0,0,1],
    origin : {xyz: [0.01,0,0.2707], rpy:[-1.57079632679,-1.57079632679,0]},
    limit : {lower:-1.57079632679, upper:2.094}
};

robot.joints.left_w2 = { 
    type : "revolute",
    parent: "left_lower_forearm", child: "left_wrist",
    axis : [0,0,1],
    origin : {xyz: [0.115975,0,0], rpy:[1.57079632679,0,1.57079632679]},
    limit : {lower:-3.059, upper:3.059}
};














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
    assignFetchModelCollada('./robots/baxter/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else if (geom_extension === "DAE") { // extend to use regex
    assignFetchModelCollada('./robots/baxter/'+robot.links[x].visual.geometry.mesh.filename,x);
  }
  else {
    assignFetchModelSTL('./robots/baxter/'+robot.links[x].visual.geometry.mesh.filename,robot.links[x].visual.material,x);
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




