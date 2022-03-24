# Set key bind
function fish_user_key_bindings
  bind \t 'forward-bigword'
  bind \e\[Z 'backward-kill-bigword'
  bind \e\e\[C 'complete-and-search'
end


# MySQL
set -x PATH /usr/local/opt/mysql@5.5/bin $PATH
set -x DYLD_LIBRARY_PATH /usr/local/opt/mysql@5.5/ $DYLD_LIBRARY_PATH


# anyenv
set -x PATH $HOME/.anyenv/bin $PATH


# pyenv
set -x PYENV_ROOT "$HOME/.anyenv/envs/pyenv"
set -x PATH $PATH "$HOME/.anyenv/envs/pyenv/bin"
set -gx PATH '/Users/kit/.anyenv/envs/pyenv/shims' $PATH
set -gx PYENV_SHELL fish

source '/Users/kit/.anyenv/envs/pyenv/libexec/../completions/pyenv.fish'
command pyenv rehash 2>/dev/null
function pyenv
  set command $argv[1]
  set -e argv[1]

  switch "$command"
  case rehash shell
    source (pyenv "sh-$command" $argv|psub)
  case '*'
    command pyenv "$command" $argv
  end
end


# rbenv
set -x RBENV_ROOT "$HOME/.anyenv/envs/rbenv"
set -x PATH $PATH "$RBENV_ROOT/bin"
set -gx PATH '/Users/kit/.anyenv/envs/rbenv/shims' $PATH
set -gx RBENV_SHELL fish

source '/Users/kit/.anyenv/envs/rbenv/libexec/../completions/rbenv.fish'
command rbenv rehash 2>/dev/null
function rbenv
  set command $argv[1]
  set -e argv[1]

  switch "$command"
  case rehash shell
    source (rbenv "sh-$command" $argv|psub)
  case '*'
    command rbenv "$command" $argv
  end
end


# ndenv
set -x NDENV_ROOT "$HOME/.anyenv/envs/ndenv"
set -x PATH "$HOME/.anyenv/envs/ndenv/bin" $PATH
set -x PATH "$NDENV_ROOT/shims" $PATH


# phpenv
set -x PHPENV_ROOT "$HOME/.anyenv/envs/phpenv"
set -x PATH $PATH "$HOME/.anyenv/envs/phpenv/bin"
set -x PATH = "$PHPENV_ROOT/shims" $PATH


# powerline-shell
function fish_prompt
    powerline-shell --shell bare $status
end


# ls after cd
function cd
  builtin cd $argv
  la
end
