const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
// 메서드의 결과값을 변수에 대입했습니다.
/**
 * 이상의 코드들에서 중요한 것은 document가 html 문서의 영역들을 나타내는 거라고 했습니다.
 * document.write('내용'); 쓰면 내용이 나왔었습니다.
 * .getElementById(argument); 태그들 중 특정 argument를 가지는 html 요소를 JavaScript의 객체명으로 불러낼 수 있다는 것을 의미합니다.
 */
// 처음 페이지에 들어갔을 때 localStorage에 저장된 기존의 todo가 있는지 확인하겠습니다.
// 그러면 이하의 코드가 현재 localStorage에 todos key를 가지고 있으면 오류가 안나겠지만, 맨 처음에 아무것도 없다면 오류가 발생할겁니다.
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);
// todos 키가 있으면 그 value를 todos 변수에 넣고, 없으면 빈 배열을 todos 변수에 넣겠다는 의미.
/**
 * 배열로 한 건 임의적으로 한겁니다. todo들이 여러개 있으니까 일단 배열로 잡았습니다. 그렇다면 내부 element의 자료형은 무엇이 되는게 가장 적절할까요. 현재 제가 브리핑한 방식으로는 true/false를 감지할 수 있어야하고, todo 내용이 string으로 표시되어야하니 적어도 boolean과 string이 있는 JS 객체가 element가 되어야할 것 같습니다.
 */
/**
 * 근데 이상의 코드는 기본적으로 js에서만 움직이지 html에서 보이는게 없습니다. 그래서 JavaScript 배열인 todos를 HTML로 그려내는 과정이 필요할 것 같습니다.
 */

function renderTodos() {
  // 기존 todo list를 초기화 -> 추가했을 때 누적 안되게 할겁니다. 추후 보여드릴겁니다.
  todoList.innerHTML = '';    // todos가 아니라 todoList입니다. 둘 차이 확인하셔야 합니다. -> todos는 localStorage 내부의 value에 해당.
  // todoList는 ul 태그가 포함된 HTML element에 해당.

  // todos를 반복 돌려가지고 html 요소로 만들어줄 겁니다.
  todos.array.forEach((todo, index) => {
    /**
     * todos의 반복을 돌면 내부 element가 존재할겁니다.
     */
    // 이건 그냥 li 태그를 만들겠다는 의미입니다.
    const li = document.createElement('li');
    // 태그만 만들었지 css 적용시키려면 클래스 이름을 정하는게 좋겠네요.
    li.className = 'todo-item'; // field 값 대입하는 방식입니다.
    if(todo.completed) {
      /**
       * localStorage의 todos key의 내부를 확인하면 배열로 저장이 되어있을겁니다. 거기의 element는 객체인데, 내부에 completed key를 가지는 boolean 자료형이 있을겁니다(체크박스로 통제할거고). 걔가 true일때의 css와 false일때의 css를 별개로 나누기 위해, true라면 이하처럼 completed라는 class를 추가해줬습니다.
       */
      li.classList.add('completed');
    }
    // li태그를 만들긴 했는데 li 태그 내부에도 저희 특정 html 요소를 집어넣기로 했었습니다.
    const checkbox = document.createElement('input');
    // 그냥 생성하면 type=text였으니까
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;//아직 저희 반복문내부에있습니다.

    // 텍스트 생성해야하는데, checkbox랑 같은 줄에 있어야하니까 span태그를 쓰겠습니다.
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text; // 지금 completed와 text라는 key를 가지겠네요. 

    // 삭제 버튼 - button 태그
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; // todo 하나마다 있어야하기 때문에 반복문 내에 있습니다. add-btn과의 차이점을 꼭 학습하세요.
    deleteBtn.innerHTML = '&times'; // x 기호에 해당합니다.

    // 위에서 만든 checkbox / span / button을 li 변수에 추가해야합니다.
    li.append(checkbox);  // li 태그 내에 checkbox를 추가하는 겁니다.
    li.append(span);
    li.append(deleteBtn);

    todoList.appendChild(li);

    // 체크박스 버튼 눌렀을 때 todo.completed의 값이 true->false / false->true로 변경이 일어나야 합니다.
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      // 완료 상태가 됐을 때 CSS를 서로 다르게 적용할겁니다.
      li.classList.toggle('completed', checkbox.checked);
      saveTodos();  // 아직 정의안했습니다. true-false로 toggle이 일어나면 그 상태를 저장할 함수가 필요해보여서 지금 만들겠다고 결정했습니다.
    })
  });
}

function saveTodos() {
  // 밥먹고 나서 하겠습니다.
}