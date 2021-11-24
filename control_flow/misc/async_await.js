'use strict'

// use async to execute tasks in sequential, parallel limited, full parallel

const processTask = async duration => {
    console.log(`⏳  task with ${duration}ms started`)

    const timerPromise = duration => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`✅  task with ${duration}ms ended`)
                resolve(duration)
            }, duration)
        }) 
    }
    return timerPromise(duration)
}

const tasks = [2000, 5000, 1000]

// serial
const serial = async tasks => {
    const results = []
    for (const task of tasks) {
        const result = await processTask(task)
        results.push(result)
    }

    console.log('🔵 results:', results)
}

// parallel
// REF: https://techbrij.com/javascript-async-await-parallel-sequence
const parallel = async tasks => {
    const results = await Promise.all(tasks.map(task => processTask(task)))

    console.log('🔵 results:', results)
}

// parallel throttled (PENDING)
const parallelThrottled = async tasks => {
    const throttleLimit = 2,
          totalTasks = tasks.length,
          results = []
    
    while (results.length < totalTasks) {
        console.log('.')

        for (let i = 1; i <= throttleLimit; i++) {
            processTask(tasks[0]).then(out => {
                console.log('>>>> completed')
                results.push(out)
            })
        }
    }

    console.log('🔵 results:', results)
}

const run = () => {
    //parallel(tasks)
    parallelThrottled(tasks)
}
run()

