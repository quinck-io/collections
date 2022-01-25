import hudson.tasks.junit.TestResultSummary

def lastRunningStage; 

pipeline {
  agent { label 'master' }

  options {
    disableConcurrentBuilds()
  }
  
  environment {
    DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/866587609055887391/kYVKgutodLsnAwLCCIpudEqenPVRsMSDVG84x1rmx-Jr2fc4ttjwVJq6mBp00ciWt-ku'
  }

  stages {

    stage('Project Init') {
      steps {
        script {
          lastRunningStage="Project Init"
        }
        sh 'npm ci'
      }
    }
    
    // stage("Lint") {
    //   steps {
    //       script {
    //         lastRunningStage="Lint"
    //       }
    //       sh 'npm run lint'
    //   }
    // }
        
    // stage("Test") {
    //   steps {
    //     script {
    //       lastRunningStage="Test"
    //     }
    //     sh 'npm run test'
    //   }
    // }

  //   stage("Build") {
  //     when {
  //       anyOf {
  //         branch 'develop';
  //         branch 'master'
  //       }
  //     }
  //     steps {
  //       script {
  //         lastRunningStage = 'Build'
  //         String commitId = sh(returnStdout: true, script: 'git rev-parse HEAD')
  //       }
  //       sh 'npm run build'
  //     }
  //   }
  // }

  post {
    always {
      script {
        // def testResult = junit "test-results.xml"
        notifyDiscord(currentBuild.result, lastRunningStage)
        deleteDir() /* clean up our workspace */
        }
    }
    failure {
      script {
        notifyDiscordFailure(lastRunningStage)
        sh 'exit 1'
      }
    }
  }
}

// def notifyDiscord(String buildStatus = 'SUCCESS', String lastRunningStage ="PRE-BUILD", TestResultSummary testResult) {
def notifyDiscord(String buildStatus = 'SUCCESS', String lastRunningStage ="PRE-BUILD") {
  
  def statusIcon;

  def successIcons = [":unicorn:",":man_dancing:", ":ghost:", ":dancer:", ":scream_cat:"]
  def failedIcons = [":fire:", "dizzy_face", ":man_facepalming:"]
  def buildFailed = false

  if (buildStatus == 'SUCCESS') {
    def successRandomIndex = (new Random()).nextInt(successIcons.size())
    statusIcon = "${successIcons[successRandomIndex]}"
  } else {
    def failedRandomIndex = (new Random()).nextInt(failedIcons.size())
    buildFailed = true
    statusIcon = "${successIcons[failedRandomIndex]}"
  }

  def title = "${env.JOB_NAME} Build: ${env.BUILD_NUMBER}"
  def title_link = "${env.RUN_DISPLAY_URL}"

  // def testSummary = "\n *Test Summary* - ${testResult.totalCount}, Failures: ${testResult.failCount}, Skipped: ${testResult.skipCount}, Passed: ${testResult.passCount}\n\nTest link: ${env.RUN_TESTS_DISPLAY_URL}"

  def author = sh(returnStdout: true, script: "git --no-pager show -s --format='%an'").trim()

  def commitTimestamp = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%cd' --date=format:'%d/%m/%Y - %H:%M:%S'").trim()
  def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
  def commitShortHash = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

  def commitMessageDetail = "Commit: ${commitTimestamp}\nMessage: ${commitMessage}\nHash: ${commitShortHash}"

  def branchName = "${env.BRANCH_NAME}"

  def tokens = "${env.JOB_NAME}".tokenize('/')
  def org = tokens[0]
  def subject = "${statusIcon} Status: *${buildStatus}*"

  if (buildFailed == true) {
    subject = subject + "\n> Failed in stage: *${lastRunningStage}*"
  }

  // subject = subject + "\n${testSummary}"


  def completeSonarURL = "${SONAR_CLOUD_URL}&branch=${env.BRANCH_NAME}"
  subject = subject + "\n\nSonar Result: ${completeSonarURL}"


  def completeMessage;
  def detailMessage = statusDetailMessage(!buildFailed, author)
  
  completeMessage = subject + "\n\n" + detailMessage

  discordSend (description: completeMessage, footer: "${commitMessageDetail}", link: title_link, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${DISCORD_WEBHOOK_URL}")
}

def notifyDiscordFailure(String lastRunningStage ="PRE-BUILD") {  
  def statusIcon;

  def successIcons = [":unicorn:",":man_dancing:", ":ghost:", ":dancer:", ":scream_cat:"]
  def failedIcons = [":fire:", "dizzy_face", ":man_facepalming:"]
  def buildFailed = true

  def failedRandomIndex = (new Random()).nextInt(failedIcons.size())
  statusIcon = "${successIcons[failedRandomIndex]}"

  def title = "${env.JOB_NAME} Build: ${env.BUILD_NUMBER}"
  def title_link = "${env.RUN_DISPLAY_URL}"

  def author = sh(returnStdout: true, script: "git --no-pager show -s --format='%an'").trim()

  def commitTimestamp = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%cd' --date=format:'%d/%m/%Y - %H:%M:%S'").trim()
  def commitMessage = sh(returnStdout: true, script: 'git log -1 --pretty=%B').trim()
  def commitShortHash = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

  def commitMessageDetail = "Commit: ${commitTimestamp}\nMessage: ${commitMessage}\nHash: ${commitShortHash}"

  def branchName = "${env.BRANCH_NAME}"

  def tokens = "${env.JOB_NAME}".tokenize('/')
  def org = tokens[0]
  def subject = "${statusIcon} Status: FAILED"

  subject = subject + "\n> Failed in stage: *${lastRunningStage}*"

  def completeMessage;
  def detailMessage = statusDetailMessage(!buildFailed, author)
  
  completeMessage = subject + "\n\n" + detailMessage

  discordSend (description: completeMessage, footer: "${commitMessageDetail}", link: title_link, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${DISCORD_WEBHOOK_URL}")
}


def statusDetailMessage(boolean success, String authorName) {
  def message;

  if (success == true) {
    def messages = [":champagne::champagne:\tCongrats **${authorName}**, ci sei riuscito. :sunglasses:\t:champagne::champagne:", 
    ":moyai::moyai:\tMah man **${authorName}**, you made it. :women_with_bunny_ears_partying:\t:moyai::moyai:",
    ":burrito::burrito:\t**${authorName}**, sei stato bravo. :women_with_bunny_ears_partying:\t:burrito::burrito:",
    ":pig::pig:\t **${authorName}** You son of a bitch. you did it. :women_with_bunny_ears_partying:\t:pig::pig:"]
    def randomIndex = (new Random()).nextInt(messages.size())
    message = messages[randomIndex]
  } else {
    def messages = [ ":fire::fire:\t* **${authorName}**, Sei un coglione!*\t:fire::fire:",
    ":bomb::bomb:\t*${authorName}*, Ma sarà possibile?\t:bomb::bomb:"]
    def randomIndex = (new Random()).nextInt(messages.size())

    message = messages[randomIndex]
  }

  return message
}