<template>
  <section class="mx-auto pt-12 w-full max-w-[1217px] pb-[100px] px-4 xl:px-0">
    <div
      class="md:mt-[45px] md:mb-[62px] flex md:flex-row flex-col md:items-center justify-between"
    >
      <h1 class="text-3xl font-medium">Credit Check</h1>
      <div class="w-full md:max-w-[300px] relative mt-2 md:mt-0">
        <input
          :value="companyName"
          class="font-normal py-2 px-4 placeholder-shown:font-medium text-lg w-full border border-gray-300 rounded-lg placeholder-shown:opacity-60 sm:text-xl ring-0 p-4"
          :class="[
            companyNotFound
              ? 'border-red-400 focus-visible:border-gray-400'
              : 'border-gray-400 focus-visible:border-theme-primary',
          ]"
          placeholder="Enter company name"
          @keyup.prevent="searchCompanies"
        />
        <span
          class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"
        >
          <svg
            v-if="isRequest"
            class="animate-spin h-5 w-5 text-theme-primary-text mt-1"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="matrix(0.5833333333333334,0,0,0.5833333333333334,0,0)"
            >
              <path
                d="M12 0.747L12 4.497"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M12 23.247L12 19.497"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M4.045 4.042L6.697 6.694"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M19.955 19.952L17.303 17.301"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M0.75 11.997L4.5 11.997"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M23.25 11.997L19.5 11.997"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M4.045 19.952L6.697 17.301"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
              <path
                d="M19.955 4.042L17.303 6.694"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
            </g>
          </svg>

          <svg
            v-if="companyNotFound"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </span>

        <div
          :class="`absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll ${
            showResults
              ? 'transform opacity-100 scale-100'
              : 'transform opacity-0 scale-95 hidden'
          }`"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="{-1}"
          style="max-height: 300px; z-index: 9999"
        >
          <div class="py-1" role="none">
            <a
              v-for="(r, i) in results"
              :id="i"
              :key="i"
              href="#!"
              class="text-theme-primary-text text-left grid hover:bg-gray-200 w-full px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="{-1}"
              @click.prevent="() => chooseCompany(r)"
            >
              <span class="text-md font-semibold capitalize">
                {{ r.registered_name }}
              </span>
            </a>
          </div>
        </div>
      </div>
      <!-- <input
        class="py-2 px-4 placeholder-shown:font-medium text-lg font-semibold max-w-[300px] w-full border border-gray-300 rounded-lg"
        placeholder="Enter company name/registeration number" /> -->
    </div>

    <div v-if="company && reports" class="max-w-[912px] w-full mt-8 md:mt-0">
      <div>
        <h2 class="mb-[17px] text-[16px] text-[#1A2F61] w-fit">
          Business Details
        </h2>
        <div class="border-b border-[#E4E7EC] w-full"></div>
        <div
          class="mt-[32px] border border-[#E4E7EC] w-full p-4 gap-4 md:py-[33px] md:px-[56px] flex flex-wrap md:gap-x-8 md:gap-y-4 rounded-[16px]"
        >
          <div>
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Company name
            </h4>
            <h4
              class="text-[14px] mt-[4px] uppercase font-semibold text-[#344054]"
            >
              {{ company.registered_name }}
            </h4>
          </div>
          <div class="md:w-1/2">
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Address
            </h4>
            <h4
              class="text-[14px] mt-[4px] uppercase font-semibold text-[#344054]"
            >
              {{ company.address }}
            </h4>
          </div>
          <div>
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Registration number
            </h4>
            <h4
              class="text-[14px] mt-[4px] uppercase font-semibold text-[#344054]"
            >
              {{ company.registration_number }}
            </h4>
          </div>
          <div>
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Credit Check Status
            </h4>
            <div class="mt-[4px]">
              <template v-if="reportsIsSuccessful">
                <span
                  class="text-[14px] font-semibold rounded-lg py-1 px-4 uppercase text-green-700 bg-green-200 border border-green-200 w-fit"
                >
                  Passed
                </span>
              </template>
              <template v-else>
                <span
                  class="text-[14px] font-semibold rounded-lg py-1 px-4 uppercase text-red-700 bg-red-200 border border-red-200 w-fit"
                >
                  Failed
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="reports && reports.companies_house_check" class="mt-[50px]">
        <div class="flex justify-between items-center mb-[17px]">
          <h2 class="text-[16px] text-[#1A2F61]">Company House Check</h2>
          <template v-if="!reports.company_failed_checks">
            <div
              class="text-[14px] font-semibold rounded-lg py-1 px-4 uppercase text-green-700 bg-green-200 border border-green-200 w-fit"
            >
              Passed
            </div>
          </template>
          <template v-else>
            <div
              class="text-[14px] font-semibold rounded-lg py-1 px-4 uppercase text-red-700 bg-red-200 border border-red-200 w-fit"
            >
              Failed
            </div>
          </template>
        </div>
        <div class="border-b border-[#E4E7EC] w-full"></div>
        <div
          class="mt-[32px] grid grid-cols-12 border border-[#E4E7EC] w-full p-4 gap-4 md:py-[33px] md:pl-[56px] md:gap-8 rounded-[16px]"
        >
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.is_not_active_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company inactive
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.is_not_active_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.company_office_in_disputes_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company office dispute
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.company_office_in_disputes_check
                  .check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.recent_director_resignations_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Recent director resignations
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check
                  .recent_director_resignations_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.company_age_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company age
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.company_age_check.check_failed
              "
              :label="
                dateFormatter(
                  reports.companies_house_check.company_age_check
                    .registration_date
                )
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.company_dissolved_recently_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company recently dissolved
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.company_dissolved_recently_check
                  .check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.old_directors_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Old directors
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.old_directors_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.company_type_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company type
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.company_type_check.check_failed
              "
              :label="
                reports.companies_house_check.company_type_check.company_type
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check
                  .directors_with_multiple_appointments_check.description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Director multiple appointments
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check
                  .directors_with_multiple_appointments_check.check_failed
              "
            />
            <div
              v-if="
                reports.companies_house_check
                  .directors_with_multiple_appointments_check.directors &&
                reports.companies_house_check
                  .directors_with_multiple_appointments_check.directors.length >
                  0
              "
              class="bg-[#F2F4F7] text-[#344054] capitalize w-fit rounded-[16px] py-[2px] px-[12px] mt-2 text-[14px]"
            >
              {{
                reports.companies_house_check
                  .directors_with_multiple_appointments_check.directors[0].name
              }}
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.companies_house_check.young_directors_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Young directors
            </h4>
            <BooleanTag
              :value="
                !reports.companies_house_check.young_directors_check
                  .check_failed
              "
            />
          </div>
        </div>
      </div>
      <div v-if="reports && reports.credit_safe_check" class="mt-[50px]">
        <h2 class="mb-[17px] text-[16px] text-[#1A2F61]">Credit Safe Check</h2>
        <div class="border-b border-[#E4E7EC] w-full"></div>
        <div
          class="mt-[32px] grid grid-cols-12 border border-[#E4E7EC] w-full p-4 gap-4 md:py-[33px] md:pl-[56px] md:gap-8 rounded-[16px]"
        >
          <div
            v-if="reports.credit_safe_check.negative_commentaries_check"
            class="col-span-12 md:col-span-4"
          >
            <h4
              v-tooltip="
                reports.credit_safe_check.negative_commentaries_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Negative commentaries
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.negative_commentaries_check
                  .check_failed
              "
            />
            <div
              v-if="
                reports.credit_safe_check.negative_commentaries_check &&
                reports.credit_safe_check.negative_commentaries_check
                  .negative_commentaries &&
                reports.credit_safe_check.negative_commentaries_check
                  .negative_commentaries.length > 0
              "
              class="bg-[#F2F4F7] text-[#344054] capitalize w-fit rounded-[16px] py-[2px] px-[12px] mt-2 text-[14px]"
            >
              {{
                reports.credit_safe_check.negative_commentaries_check
                  .negative_commentaries[0]
              }}
            </div>
          </div>
          <!-- <div
            v-if="reports.credit_safe_check.negative_commentaries_check"
            class="col-span-12 md:col-span-4"
          >
            <h4
              v-tooltip="
                reports.credit_safe_check.negative_commentaries_check
                  .description || ''
              " class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              High Risk
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.negative_commentaries_check
                  .check_failed
              "
            />
          </div> -->
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.registeredcc_js_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Registered CCJs
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.registeredcc_js_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.credit_limit_decreased_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Credit limit decreased
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.credit_limit_decreased_check
                  .check_failed
              "
            />
          </div>
          <!-- :label="dateFormatter(reports.credit_safe_check.company_age_check.registration_date)" -->
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.disqualified_directors_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Disqualified directors
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.disqualified_directors_check
                  .check_failed
              "
            />
            <div
              v-if="
                reports.credit_safe_check.disqualified_directors_check
                  .directors &&
                reports.credit_safe_check.disqualified_directors_check.directors
                  .length > 0
              "
              class="bg-[#F2F4F7] text-[#344054] capitalize w-fit rounded-[16px] py-[2px] px-[12px] mt-2 text-[14px]"
            >
              {{
                reports.credit_safe_check.disqualified_directors_check
                  .directors[0].name
              }}
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.cc_js_check.description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              CCJs
            </h4>
            <BooleanTag
              :value="!reports.credit_safe_check.cc_js_check.check_failed"
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.cc_js_check.description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Credit rate decreased
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.credit_rating_decreased_check
                  .check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.contingent_liabilities_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Contingent liabilities
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.contingent_liabilities_check
                  .check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.satisfiedcc_js_check.description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Satisfied CCJs
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.satisfiedcc_js_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.company_age_check.description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Company age
            </h4>
            <BooleanTag
              :value="!reports.credit_safe_check.company_age_check.check_failed"
              :label="
                dateFormatter(
                  reports.credit_safe_check.company_age_check.registration_date
                )
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.high_debt_ratio_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              High debt ratio
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.high_debt_ratio_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.writ_of_control_check.description ||
                ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Writ of control
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.writ_of_control_check.check_failed
              "
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4
              v-tooltip="
                reports.credit_safe_check.has_group_structure_check
                  .description || ''
              "
              class="text-[13px] text-[#667085] font-[400] cursor-help w-fit"
            >
              Has Group Structure
            </h4>
            <BooleanTag
              :value="
                !reports.credit_safe_check.has_group_structure_check
                  .check_failed
              "
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          reports && reports.credit_safe_check && reports.companies_house_check
        "
        class="mt-[50px] hidden"
      >
        <h2 class="mb-[17px] text-[16px] text-[#1A2F61]">
          Check summary information
        </h2>
        <div class="border-b border-[#E4E7EC] w-full"></div>
        <div
          class="mt-[32px] grid grid-cols-12 border border-[#E4E7EC] w-full py-[33px] md:pl-[56px] md:gap-8 rounded-[16px]"
        >
          <div class="col-span-12 md:col-span-4">
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Company Name
            </h4>
            <div
              class="w-fit text-[14px] mt-[4px] uppercase font-semibold text-[#344054] bg-[#F2F4F7] px-[10px] py-[2px] rounded-[16px]"
            >
              {{ company.registered_name }}
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Company Number
            </h4>

            <div
              class="w-fit text-[14px] mt-[4px] uppercase font-semibold text-[#344054] bg-[#F2F4F7] px-[10px] py-[2px] rounded-[16px]"
            >
              {{ company.registration_number }}
            </div>
          </div>
          <div class="col-span-12 md:col-span-4">
            <h4 class="text-[13px] text-[#667085] font-[400] cursor-help w-fit">
              Credit Check Result
            </h4>
            <BooleanTag
              :value="reportsIsSuccessful"
              :label="reportsIsSuccessful ? 'Successful' : 'Failed'"
            />
          </div>
        </div>
      </div>
    </div>
    <Spinner v-if="checkStatus === 'pending'" additional-class="top-[20%]" />
  </section>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { debounce } from 'lodash'
import BooleanTag from '~/components/Tag/Boolean.vue'
import { MOCK_KYC_RESPONSE } from '~/utils/mock'

dayjs.extend(relativeTime)

export default {
  name: 'CreditCheckPage',
  components: {
    BooleanTag,
    Spinner: () => import('~/components/Spinner.vue'),
  },
  layout: 'auth',
  data() {
    return {
      companyNumber: null,
      isConfirmed: false,
      isRequestPending: false,
      debounce,
      idFormChanged: false,
      isRequest: false,
      companyNotFound: false,
      results: [],
      showResults: false,
      cancelToken: undefined,
      company: null,
      companyName: null,
      reports: null,
      reportsIsSuccessful: false,
      fetchReportsError: false,
      checkStatus: 'not-started',
    }
  },
  head() {
    return {
      title: 'Credit Check | Lenkie',
    }
  },
  watch: {
    async company() {
      await this.getReports()
    },
  },
  methods: {
    dateFormatter(date) {
      return dayjs(date).fromNow()
    },
    chooseCompany(company) {
      this.showResults = false
      this.company = company
      this.companyName = company.registered_name
    },
    async getReports() {
      try {
        this.checkStatus = 'pending'
        const number = this.company?.registration_number
        const {
          data: { is_success: isSuccess, result },
          // } = await this.$internalApi.get(
          //   `/CreditSafe/Checks?registrationNumber=${number}`
        } = await this.$lenkieCompositionApi.get(
          `/KYC/Checks?registrationNumber=${number}`
        )
        this.checkStatus = 'success'
        this.reportsIsSuccessful = isSuccess
        this.reports = result[0]
      } catch (error) {
        this.reports = MOCK_KYC_RESPONSE
        this.fetchReportsError = true
        this.checkStatus = 'error'
      }
    },
    searchCompanies: debounce(async function (evt) {
      try {
        const value = evt.target?.value || ''
        this.companyName = value
        if (value.length < 1) return

        this.companyNotFound = false
        this.isRequest = true

        if (typeof this.cancelToken !== typeof undefined) {
          this.cancelToken.cancel('Operation canceled due to new request.')
        }

        this.cancelToken = axios.CancelToken.source()

        const { data } = await this.$lenkieApi.get(
          `/Organisations/CompaniesHouse?query=${value}`,
          { cancelToken: this.cancelToken?.token }
        )

        this.isRequest = false

        if (data.length > 0) {
          this.showResults = true
          this.results = data.map((d) => ({
            ...d,
            registration_number: d.company_number,
            registered_name: d.title?.toLowerCase(),
            address: d.address_snippet,
          }))
          return
        } else {
          this.$toast({
            text: 'No company results available.',
            type: 'error',
            time: 3,
          })
          this.results = []
          this.showResults = false
          this.companyNotFound = true
        }
      } catch (error) {
        if (axios.isCancel(error)) return
        this.companyNotFound = true
        this.$toast({
          text:
            error.response?.message ||
            'Failed to retrieve available company results',
          type: 'error',
          time: 3,
        })
      } finally {
        this.isRequest = false
        this.cancelToken = undefined
      }
    }, 800),
  },
}
</script>
