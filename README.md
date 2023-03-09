\*\*\* Flow

- Call API: emit 'error'

- FileWriterWorker: write in append mode

- SSEPublishWorker: keep array of subsrcibers, write on error event

\*\*\* Scaling:

- Master publisher: holds no connection

- Many slave publisher instance: each holds limited numbers of connections

\*\*\* Updated Flow:

- Emit to master publisher only → master emit to slaves

\*\*\* TODO:

- Rebuild code on request
