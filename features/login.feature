Feature: I login to github.com and creating new repository
  Background:
    Given I open web-page

  Scenario: Navigating to web-page
    When I enter e-mail "testJSautomation@protonmail.com" and password "1automationJS"
    Then I see username "testJSautomationTS" on the page

  Scenario: Creating repository
    When I create new repository "test"
    Then I check readme.md file was created

  Scenario: Deleting repository
    When I delete repository "test"
    Then I check repository "test" was deleted
