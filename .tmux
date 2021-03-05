#!/bin/bash
set -e
function attachOrSwitch(){
  if [[ $TMUX ]];then
    tmux switch-client -t todo-app$1
  else
    tmux attach -t todo-app$1
  fi
}

# Attach to the session if it already exists
if tmux has-session -t=todo-app 2> /dev/null; then
  attachOrSwitch; exit
fi

# Create a new session with the first window being called vim
tmux new-session -d -s todo-app -n vim -x 162 -y 53

# 1. Main window: vim, server, shell.
tmux send-keys -t todo-app:vim "nvim -c Files" Enter

# 2. Create a second window you could create splits etc in the same way as the
# above section
tmux new-window -t todo-app -c $PWD -n Docker
tmux send-keys -t todo-app:Docker "docker-compose up" Enter

# Attach to the newly created session
attachOrSwitch :vim.left

