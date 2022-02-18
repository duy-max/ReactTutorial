import React, { Component } from "react";
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  onExitForm = () => {
    this.props.onCloseForm(); //props này là của App component
  };

  onChangeForm = (event) => {
    var target = event.target;

    var name = target.name;
    var val = target.value;
    if (name === "status") {
      val = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: val,
    });
  };
  onResetForm = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onReceiveTask(this.state);
    //Sau khi submit xong thì reset & close form
    this.onResetForm();
    this.onExitForm();
  };

  componentDidMount() {
    //Lifecycle sẽ được gọi khi gắn cái component vào
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    //lifecycle sẽ trả về cái props khi mà nó đã được gắn vào trước đó rồi
    //khi ta nhấn ''thêm công việc - > sửa' bản chất của lifecycle là chưa được gắn vào thì nó mới trả
    // ra props, trường hợp khi ta gắn component vào rồi thì ta viết như thế này
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }

  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id === "" ? "Thêm công việc" : "Cập nhật công việc"}
            <span
              className="fas fa-times-circle fl-r"
              onClick={this.onExitForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChangeForm}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              value={this.state.status}
              name="status"
              onChange={this.onChangeForm}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                {id === "" ? "Thêm" : "Cập nhật"}
              </button>
              &nbsp;
              <button
                type="submit"
                className="btn btn-danger"
                onClick={this.onResetForm}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
