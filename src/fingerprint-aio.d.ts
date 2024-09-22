/* eslint-disable */

interface FingerprintOptions {
  /**
   * Title in biometric prompt (android only)
   *
   * @default {APP_NAME} Biometric Sign On
   */
  title?: string

  /**
   * Subtitle in biometric Prompt (android only)
   *
   * @default null
   */
  subtitle?: string

  /**
   * Description in biometric Prompt
   *
   * @default null
   */
  description?: string

  /**
   * Title of fallback button.
   *
   * @default "Use Pin"
   */
  fallbackButtonTitle?: string

  /**
   * Title for cancel button on Android
   *
   * @default "Cancel"
   */
  cancelButtonTitle?: string

  /**
   * Disable 'use backup' option.
   *
   * @default false
   */
  disableBackup?: boolean

  /**
   * (Android): If false user confirmation is NOT required after a biometric has been authenticated.
   *
   * @default true.
   * See https://developer.android.com/training/sign-in/biometric-auth#no-explicit-user-action
   */
  confirmationRequired?: boolean
}

// Biometric type
export type BIOMETRIC_TYPE = 'finger' | 'face' | 'biometric'

export interface FingerprintSecretOptions extends FingerprintOptions {
  /**
   * String secret to encrypt and save, use simple strings matching the regex [a-zA-Z0-9\-]+
   */
  secret: string

  /**
   * If `true` secret will be deleted when biometry items are deleted or enrolled
   *
   * @default false
   */
  invalidateOnEnrollment?: boolean
}

interface Fingerprint {
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_UNKNOWN_ERROR: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_UNAVAILABLE: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_AUTHENTICATION_FAILED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_SDK_NOT_SUPPORTED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_HARDWARE_NOT_SUPPORTED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_PERMISSION_NOT_GRANTED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_NOT_ENROLLED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_INTERNAL_PLUGIN_ERROR: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_DISMISSED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_PIN_OR_PATTERN_DISMISSED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_SCREEN_GUARD_UNSECURED: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_LOCKED_OUT: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_LOCKED_OUT_PERMANENT: number
  /**
   * Convenience constant
   *
   * @type {number}
   */
  readonly BIOMETRIC_SECRET_NOT_FOUND: number
  /**
   * Check if fingerprint authentication is available
   *
   * @returns {Promise<BIOMETRIC_TYPE>} Returns a promise with result which depends on device and os.
   * iPhone X will return 'face' other Android or iOS devices will return 'finger' Android P+ will return 'biometric'
   */
  isAvailable(): Promise<BIOMETRIC_TYPE>
  /**
   * Show authentication dialogue and register secret
   *
   * @param {FingerprintSecretOptions} options Options for platform specific fingerprint API
   * @returns {Promise<void>} Returns a promise that resolves when authentication was successful
   */
  registerBiometricSecret(options: FingerprintSecretOptions): Promise<void>

  /**
   * Show authentication dialogue and load secret
   *
   * @param {FingerprintOptions} options Options for platform specific fingerprint API
   * @returns {Promise<string>} Returns a promise that resolves when authentication was successful
   */
  loadBiometricSecret(options: FingerprintOptions): Promise<string>
  /**
   * Show authentication dialogue
   *
   * @param {FingerprintOptions} options Options for platform specific fingerprint API
   * @returns {Promise<void>} Returns a promise that resolves when authentication was successful
   */
  show(options: FingerprintOptions): Promise<void>
}

declare var Fingerprint: Fingerprint
