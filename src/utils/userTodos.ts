import { ref,computed,Ref } from "vue";
import { useStorage } from "./useStorage.js";
interface Todo{
    title:string,
    done:boolean
}
export function userTodos() {
    let title = ref("");
    let todos:Ref<Todo[]> = ref(useStorage('todos'))
    let showModal = ref(false);
    function addTodo(){
        if(!title.value){
            showModal.value = true;
            setTimeout(() => {
                showModal.value = false;
            },1500);
            return
        }
        todos.value.push({
            title: title.value,
            done: false,
        });
        title.value = "";
    }
    function clear(){
        todos.value = todos.value.filter((v) => !v.done);
    }
    let active = computed(() => {
        return todos.value.filter((v) => !v.done).length;
    });
    let all = computed(() => todos.value.length);
    let allDone = computed({
        get: function() {
            return active.value === 0;
        },
        set: function(value) {
            todos.value.forEach((todo) => {
                todo.done = value
            });
        },
    });
    function removeTodo(e,i){
        todos.value.splice(i,1);
    }
    return { title,todos,addTodo,clear,active,all,allDone,showModal,removeTodo };
}