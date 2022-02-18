import "./App.css";
import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/control";
import TaskList from "./components/TaskList";
import {findIndex} from 'lodash';   //import thư viện lodash, dùng hàm nào thì import hàm đó để tối ưu hiệu suất
import Demo   from "./training/demo";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false, //Dùng để hiển thị/Ẩn form
      TaskEditing: null, //Dùng để lưu cái task mà mình sửa
      filter: {
        //Tạo ra một object filter để hàm render truy cập vào 2 biến filterName, filterStatus
        name: "",
        status: -1,
      },

      keyword: "",

      sort: {
        by: "",
        value: 1,
      },
    };
  }

  componentDidMount() {
    //hàm này hệ thống này tự gọi khi ta F5 hay refresh lại trang
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks")); //Chuyển dạng string về object để setState
      this.setState({ tasks: tasks });
    }
  }

  randomString() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1); //Tạo chuỗi random 4 số
  }

  generateID() {
    return (
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString() +
      "-" +
      this.randomString()
    );
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.TaskEditing !== null) {
      this.setState({
        isDisplayForm: true,
        TaskEditing: null,
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        TaskEditing: null,
      });
    }
  };

  onCloseFormFunc = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  };

  onReceiveTask = (data) => {
    var { tasks } = this.state; // tasks = this.state.tasks
    if (data.id === "") {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      var index_val = findIndex(tasks, (task) => {   //Dùng thư viện lodash để findIndex thay vì tự định nghĩa 
        return task.id === data.id;
   });
   
      tasks[index_val] = data;
    }

    this.setState({
      tasks: tasks,
      TaskEditing: null,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    //  console.log( data);
  };

  // Update Status
  onUpdateStatus = (id) => {
    var { tasks } = this.state; //Lấy ds các task trong mảng tasks

   // var index_val = this.findIndex(id);
     var index_val = findIndex(tasks, (task) => {
          return task.id === id;
     });
     

    if (index_val !== -1) {
      tasks[index_val].status = !tasks[index_val].status; //Cập nhật giá trị status
    }

    this.setState({ tasks: tasks }); //Set lại state
    localStorage.setItem("tasks", JSON.stringify(tasks)); //Lưu vào localStorage
  };

  //Tìm index ứng với id khi click vào, tự định nghĩa
  findIndex = (id) => {
    var { tasks } = this.state; //Lấy ds các task trong mảng tasks
    var result = -1;
    tasks.forEach((task, index) => {
      if (id === task.id) {
        result = index;
      }
    });

    return result;

  };

  //Delete Item

  onDelete = (id) => {
    var { tasks } = this.state; //Lấy ds các task trong mảng tasks

    var index_val = findIndex(tasks, (task) => {
      return task.id === id;
 });
 
    if (index_val !== -1) {
      tasks.splice(index_val, 1);
      this.setState({ tasks: tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks)); //Lưu vào localStorage
    }

    this.onCloseFormFunc();
  };

  //Update item
  onUpdate = (id) => {
    this.onShowForm();
    var { tasks } = this.state; //Lấy ds các task trong mảng tasks

    var index_val = findIndex(tasks, (task) => {
      return task.id === id;
 });
 
    var taskEditing = tasks[index_val];
    this.setState({
      TaskEditing: taskEditing,
    });
  };

  //FilterName & FilterStatus

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: +filterStatus, //Dấu '+' có nghĩa là ép kiếu string -> number or có thể ép kiểu bằng parseInt
      },
    });
  };

  onSearch = (data) => {
    this.setState({
      keyword: data.toLowerCase(),
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };

  render() {
    var { tasks, isDisplayForm, TaskEditing, filter, keyword, sort } =
      this.state; // var task = this.state.tasks

    //Sort
    if (sort.by === "name") {
      tasks.sort((a, b) => {    //a,b: tương ứng vs 2 task trong tasks
        if (a.name > b.name) return sort.value;
        //a.name: name ở đây là name của task
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return sort.value;
        //a.status: status ở đây là name của task
        else if (a.status < b.status) return -sort.value;
        else return 0;
      });
    }

    //Lọc (filter)
    if (filter) {
      //Kiểm tra filter có tồn tại hay k

      //filter theo name
      if (filter.name) {
        tasks = tasks.filter((task) => {  //Dùng method filter của array
          //method filter của array trong js sẽ trả về 1 task trong mảng tasks
          return task.name.toLowerCase().indexOf(filter.name) !== -1; //Chỉ return khi mà index chứa cái từ đang lọc khác -1
        });

      
      }

      // filter theo status     Lưu ý: if ( filter.status) // thì nó sẽ kiểm tra !==null, !==undefine, !==0
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 0 ? false : true);
        }
      });
    }

    //Search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    var elmDisplayForm = isDisplayForm ? (
      <TaskForm
        onReceiveTask={this.onReceiveTask}
        onCloseForm={this.onCloseFormFunc}
        task={TaskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            {elmDisplayForm}
          </div>
          <div className={isDisplayForm ? "col-lg-8" : "col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>

            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sort.by}
              sortValue={sort.value}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
